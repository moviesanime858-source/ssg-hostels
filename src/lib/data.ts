import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  getBuildings,
  getBuildingById,
  getContact,
  getFacilities,
  getTransport,
} from "@/lib/firebase/services";
import {
  DEMO_BUILDINGS,
  DEMO_CONTACT,
  DEMO_FACILITIES,
  DEMO_TRANSPORT,
} from "@/lib/demo-data";
import type { Building, ContactInfo, FacilityItem, Transport } from "@/types";
import { getDefaultContact } from "@/lib/utils";

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!isFirebaseConfigured()) return fallback;
    return await fn();
  } catch {
    return fallback;
  }
}

export async function fetchBuildings(): Promise<Building[]> {
  return await safeFetch(getBuildings, []);
}

export async function fetchBuilding(id: string): Promise<Building | null> {
  return await safeFetch(() => getBuildingById(id), null);
}

export async function fetchContact(): Promise<ContactInfo> {
  const contact = await safeFetch(getContact, null);
  if (contact) return contact;
  return DEMO_CONTACT;
}

export async function fetchTransport(): Promise<Transport> {
  const transport = await safeFetch(getTransport, null);
  if (transport) return transport;
  return DEMO_TRANSPORT;
}

export async function fetchFacilities(): Promise<FacilityItem[]> {
  const facilities = await safeFetch(getFacilities, DEMO_FACILITIES);
  return facilities.length > 0 ? facilities : DEMO_FACILITIES;
}

export function getFallbackContact(): ContactInfo {
  return {
    id: "fallback",
    ...getDefaultContact(),
    updatedAt: new Date().toISOString(),
  };
}
