import type { Building, ContactInfo, Transport } from "@/types";
import { DEFAULT_FACILITIES } from "@/types";
export const DEMO_BUILDINGS: Building[] = [
  {
    id: "demo-1",
    name: "Sunrise Hostel Block A",
    description:
      "Modern PG accommodation with spacious rooms and excellent connectivity to the university. Perfect for students seeking a comfortable and secure living environment.",
    images: [
      "https://images.unsplash.com/photo-1555854877-0b037c5d5566?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    roomTypes: [
      { name: "Single Sharing", rent: 8500, description: "Private room with attached bathroom" },
      { name: "Double Sharing", rent: 6500, description: "Shared room for two students" },
      { name: "Triple Sharing", rent: 5000, description: "Economical option for three students" },
    ],
    feeStructure: [
      { label: "Security Deposit", amount: 5000, note: "Refundable" },
      { label: "Maintenance", amount: 500, note: "Monthly" },
      { label: "Registration Fee", amount: 1000, note: "One-time" },
    ],
    facilities: ["WiFi", "Laundry", "Food", "Hot Water", "Security"],
    vacancyStatus: "available",
    distanceFromUniversity: "0.5 km",
    googleMapsUrl: "https://maps.google.com",
    startingRent: 5000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Green Valley PG",
    description:
      "Peaceful hostel surrounded by greenery with premium amenities. Ideal for students who prefer a calm environment with all modern facilities.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c45748?w=800&q=80",
    ],
    roomTypes: [
      { name: "Single Sharing", rent: 9500 },
      { name: "Double Sharing", rent: 7000 },
    ],
    feeStructure: [
      { label: "Security Deposit", amount: 6000, note: "Refundable" },
      { label: "Maintenance", amount: 600, note: "Monthly" },
    ],
    facilities: ["WiFi", "Laundry", "Food", "Security"],
    vacancyStatus: "limited",
    distanceFromUniversity: "1.2 km",
    googleMapsUrl: "https://maps.google.com",
    startingRent: 7000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "Campus Edge Residency",
    description:
      "Located right at the university gate. Quick access to campus, library, and cafeteria. Popular choice among first-year students.",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    roomTypes: [
      { name: "Double Sharing", rent: 6000 },
      { name: "Triple Sharing", rent: 4500 },
      { name: "Four Sharing", rent: 3800 },
    ],
    feeStructure: [
      { label: "Security Deposit", amount: 4000, note: "Refundable" },
      { label: "Maintenance", amount: 400, note: "Monthly" },
    ],
    facilities: ["WiFi", "Hot Water", "Security", "Housekeeping"],
    vacancyStatus: "full",
    distanceFromUniversity: "0.2 km",
    googleMapsUrl: "https://maps.google.com",
    startingRent: 3800,
    createdAt: new Date().toISOString(),
  },
];

export const DEMO_TRANSPORT: Transport = {
  id: "demo",
  monthlyMandadam: 800,
  monthlyInavolu: 500,
  weeklyMandadam: 250,
  weeklyInavolu: 150,
  pickupPgToUniv: "Hostel Mess",
  pickupUnivToPg: "VIT-AP Main Gate",
  timingsPgToUniv: ["8:30 AM", "9:00 AM", "9:30 AM", "1:30 PM"],
  timingsUnivToPg: ["4:00 PM", "5:00 PM", "6:00 PM", "7:30 PM"],
  updatedAt: new Date().toISOString(),
};

export const DEMO_CONTACT: ContactInfo = {
  id: "demo",
  primaryPhone: "+91 79815 80663",
  secondaryPhone: "",
  whatsapp: "917981580663",
  email: "contact@ssghostels.com",
  hostelName: "SSG HOSTELS",
  inquiryMessageTemplate: "Hi, I would like to inquire about room availability and building details.",
  updatedAt: new Date().toISOString(),
};

export const DEMO_FACILITIES = DEFAULT_FACILITIES.map((f, i) => ({
  ...f,
  id: `demo-${i}`,
}));
