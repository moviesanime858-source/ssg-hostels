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

export async function getContact(): Promise<ContactInfo | null> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.contact, "default");
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    primaryPhone: (data.primaryPhone as string) ?? "",
    secondaryPhone: (data.secondaryPhone as string) ?? "",
    whatsapp: (data.whatsapp as string) ?? "",
    email: (data.email as string) ?? "",
    hostelName: (data.hostelName as string) ?? "",
    inquiryMessageTemplate: (data.inquiryMessageTemplate as string) ?? "",
    updatedAt: timestampToISO(data.updatedAt),
  };
}

export async function upsertContact(data: ContactInput): Promise<void> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.contact, "default");
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getTransport(): Promise<Transport | null> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.transport, "default");
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    monthlyMandadam: (data.monthlyMandadam as number) ?? 0,
    monthlyInavolu: (data.monthlyInavolu as number) ?? 0,
    weeklyMandadam: (data.weeklyMandadam as number) ?? 0,
    weeklyInavolu: (data.weeklyInavolu as number) ?? 0,
    pickupPgToUniv: (data.pickupPgToUniv as string) ?? "",
    pickupUnivToPg: (data.pickupUnivToPg as string) ?? "",
    timingsPgToUniv: (data.timingsPgToUniv as string[]) ?? [],
    timingsUnivToPg: (data.timingsUnivToPg as string[]) ?? [],
    updatedAt: timestampToISO(data.updatedAt),
  };
}

export async function upsertTransport(data: TransportInput): Promise<void> {
  const docRef = doc(getFirebaseDb(), COLLECTIONS.transport, "default");
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
