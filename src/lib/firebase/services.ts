import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage } from "./config";
import type {
  Building,
  BuildingInput,
  ContactInfo,
  ContactInput,
  FacilityItem,
  Transport,
  TransportInput,
} from "@/types";

const COLLECTIONS = {
  buildings: "buildings",
  transport: "transport",
  facilities: "facilities",
  contact: "contact",
  inquiries: "inquiries",
} as const;

function timestampToISO(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return new Date().toISOString();
}

function mapBuilding(id: string, data: Record<string, unknown>): Building {
  const roomTypes = (data.roomTypes as Building["roomTypes"]) ?? [];
  const startingRent =
    (data.startingRent as number | undefined) ??
    (roomTypes.length > 0
      ? Math.min(...roomTypes.map((r) => r.rent))
      : undefined);

  return {
    id,
    name: (data.name as string) ?? "",
    description: (data.description as string) ?? "",
    images: (data.images as string[]) ?? [],
    roomTypes,
    feeStructure: (data.feeStructure as Building["feeStructure"]) ?? [],
    facilities: (data.facilities as string[]) ?? [],
    vacancyStatus: (data.vacancyStatus as Building["vacancyStatus"]) ?? "available",
    distanceFromUniversity: (data.distanceFromUniversity as string) ?? "",
    googleMapsUrl: (data.googleMapsUrl as string) ?? "",
    startingRent,
    createdAt: timestampToISO(data.createdAt),
  };
}

// ─── Buildings ───────────────────────────────────────────────────────────────

export async function getBuildings(): Promise<Building[]> {
  const q = query(
    collection(getFirebaseDb(), COLLECTIONS.buildings),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => mapBuilding(d.id, d.data()));
}

export async function getBuildingById(id: string): Promise<Building | null> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.buildings, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return mapBuilding(snapshot.id, snapshot.data());
}

export async function createBuilding(data: BuildingInput): Promise<string> {
  const docRef = await addDoc(collection(getFirebaseDb(), COLLECTIONS.buildings), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateBuilding(
  id: string,
  data: Partial<BuildingInput>
): Promise<void> {
  await updateDoc(doc(getFirebaseDb(), COLLECTIONS.buildings, id), data);
}

export async function deleteBuilding(id: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), COLLECTIONS.buildings, id));
}

// ─── Transport ───────────────────────────────────────────────────────────────

const TRANSPORT_DOC_ID = "default";

export async function getTransport(): Promise<Transport | null> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.transport, TRANSPORT_DOC_ID);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    autoTimings: (data.autoTimings as string[]) ?? [],
    pickupPoints: (data.pickupPoints as Transport["pickupPoints"]) ?? [],
    charges: (data.charges as Transport["charges"]) ?? [],
    updatedAt: timestampToISO(data.updatedAt),
  };
}

export async function upsertTransport(data: TransportInput): Promise<void> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.transport, TRANSPORT_DOC_ID);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ─── Facilities ──────────────────────────────────────────────────────────────

export async function getFacilities(): Promise<FacilityItem[]> {
  const snapshot = await getDocs(collection(getFirebaseDb(), COLLECTIONS.facilities));
  return snapshot.docs.map((d) => ({
    id: d.id,
    name: (d.data().name as string) ?? "",
    description: (d.data().description as string) ?? "",
    icon: (d.data().icon as string) ?? "default",
  }));
}

export async function upsertFacility(
  id: string | null,
  data: Omit<FacilityItem, "id">
): Promise<string> {
  if (id) {
    await updateDoc(doc(getFirebaseDb(), COLLECTIONS.facilities, id), data);
    return id;
  }
  const docRef = await addDoc(collection(getFirebaseDb(), COLLECTIONS.facilities), data);
  return docRef.id;
}

export async function deleteFacility(id: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), COLLECTIONS.facilities, id));
}

// ─── Contact ─────────────────────────────────────────────────────────────────

const CONTACT_DOC_ID = "default";

export async function getContact(): Promise<ContactInfo | null> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.contact, CONTACT_DOC_ID);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    phone: (data.phone as string) ?? "",
    whatsapp: (data.whatsapp as string) ?? "",
    email: (data.email as string) ?? "",
    address: (data.address as string) ?? "",
    googleMapsUrl: (data.googleMapsUrl as string) ?? "",
    updatedAt: timestampToISO(data.updatedAt),
  };
}

export async function upsertContact(data: ContactInput): Promise<void> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.contact, CONTACT_DOC_ID);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ─── Storage ─────────────────────────────────────────────────────────────────

export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(getFirebaseStorage(), path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const storageRef = ref(getFirebaseStorage(), url);
    await deleteObject(storageRef);
  } catch {
    // URL-based delete may fail if not a storage path; ignore
  }
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

import type { Inquiry, InquiryInput } from "@/types";

export async function createInquiry(data: InquiryInput): Promise<string> {
  const docRef = await addDoc(collection(getFirebaseDb(), COLLECTIONS.inquiries), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const q = query(
    collection(getFirebaseDb(), COLLECTIONS.inquiries),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: (data.name as string) ?? "",
      phone: (data.phone as string) ?? "",
      buildingId: (data.buildingId as string) ?? "",
      buildingName: (data.buildingName as string) ?? "",
      createdAt: timestampToISO(data.createdAt),
    };
  });
}

export async function deleteInquiry(id: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), COLLECTIONS.inquiries, id));
}
