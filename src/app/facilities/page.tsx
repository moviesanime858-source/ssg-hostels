import { PublicLayout } from "@/components/layout/PublicLayout";
import { FacilityCard } from "@/components/facilities/FacilityCard";
import { fetchFacilities } from "@/lib/data";

export const metadata = {
  title: "Facilities",
  description: "WiFi, laundry, food, hot water, security, power backup, and more hostel amenities.",
};

export default async function FacilitiesPage() {
  const facilities = await fetchFacilities();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Facilities
          </h1>
          <p className="mt-2 text-slate-600">
            Everything you need for comfortable student living, all under one roof.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
