export type VacancyStatus = "available" | "limited" | "full";

export interface RoomType {
  name: string;
  rent: number;
  description?: string;
}

export interface FeeItem {
  label: string;
  amount: number;
  note?: string;
}

export interface Building {
  id: string;
  name: string;
  description: string;
  images: string[];
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  roomTypes: RoomType[];
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  feeStructure: FeeItem[];
  facilities: string[];
  vacancyStatus: VacancyStatus;
  distanceFromUniversity: string;
  googleMapsUrl: string;
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  startingRent?: number;
  createdAt: string;
}

export interface BuildingInput {
  name: string;
  description: string;
  images: string[];
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  roomTypes: RoomType[];
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  feeStructure: FeeItem[];
  facilities: string[];
  vacancyStatus: VacancyStatus;
  distanceFromUniversity: string;
  googleMapsUrl: string;
  /** @deprecated Pricing model changed. Fees are no longer tied to specific buildings. */
  startingRent?: number;
}

export interface Transport {
  id: string;
  monthlyMandadam: number;
  monthlyInavolu: number;
  weeklyMandadam: number;
  weeklyInavolu: number;
  pickupPgToUniv: string;
  pickupUnivToPg: string;
  timingsPgToUniv: string[];
  timingsUnivToPg: string[];
  updatedAt: string;
}

export interface TransportInput {
  monthlyMandadam: number;
  monthlyInavolu: number;
  weeklyMandadam: number;
  weeklyInavolu: number;
  pickupPgToUniv: string;
  pickupUnivToPg: string;
  timingsPgToUniv: string[];
  timingsUnivToPg: string[];
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  id: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsapp: string;
  email: string;
  hostelName: string;
  inquiryMessageTemplate: string;
  updatedAt: string;
}

export interface ContactInput {
  primaryPhone: string;
  secondaryPhone: string;
  whatsapp: string;
  email: string;
  hostelName: string;
  inquiryMessageTemplate: string;
}

export const VACANCY_LABELS: Record<VacancyStatus, string> = {
  available: "Available",
  limited: "Limited Seats",
  full: "Full",
};

export const VACANCY_COLORS: Record<VacancyStatus, string> = {
  available: "bg-emerald-100 text-emerald-800",
  limited: "bg-amber-100 text-amber-800",
  full: "bg-red-100 text-red-800",
};

export const DEFAULT_FACILITIES: Omit<FacilityItem, "id">[] = [
  {
    name: "High-Speed WiFi",
    description: "Unlimited high-speed internet for study and streaming.",
    icon: "wifi",
  },
  {
    name: "Laundry",
    description: "Washing machines and drying area available on-site.",
    icon: "laundry",
  },
  {
    name: "Food",
    description: "Nutritious meals served daily with vegetarian options.",
    icon: "food",
  },
  {
    name: "Hot Water",
    description: "24/7 hot water supply in all bathrooms.",
    icon: "hot-water",
  },
  {
    name: "Security",
    description: "CCTV surveillance and 24-hour security staff.",
    icon: "security",
  },
  {
    name: "Housekeeping",
    description: "Regular cleaning and maintenance of rooms and common areas.",
    icon: "housekeeping",
  },
];

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  buildingId: string;
  buildingName: string;
  createdAt: string;
}

export interface InquiryInput {
  name: string;
  phone: string;
  buildingId: string;
  buildingName: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  buildingId: string;
  roomType: "2 Sharing" | "3 Sharing" | "4 Sharing";
  monthlyRent: number;
  capacity: number;
  occupants: number;
  status: "available" | "full" | "maintenance";
  createdAt?: string;
}

export interface RoomInput {
  roomNumber: string;
  buildingId: string;
  roomType: "2 Sharing" | "3 Sharing" | "4 Sharing";
  monthlyRent: number;
  capacity: number;
  occupants: number;
  status: "available" | "full" | "maintenance";
}

export interface VacationPeriod {
  startDate: string;
  endDate: string; // empty string "" means currently on break
}

export interface Student {
  id: string;
  registrationNumber?: string;
  name: string;
  phone: string;
  joinedDate: string;
  monthlyFee: number;
  feePaid: number;
  remainingFee: number;
  roomId: string;
  buildingId: string;
  status: "active" | "inactive";
  vacationPeriods?: VacationPeriod[];
  createdAt?: string;
}

export interface StudentInput {
  registrationNumber?: string;
  name: string;
  phone: string;
  joinedDate: string;
  monthlyFee: number;
  feePaid: number;
  remainingFee: number;
  roomId: string;
  buildingId: string;
  status: "active" | "inactive";
  vacationPeriods?: VacationPeriod[];
}
