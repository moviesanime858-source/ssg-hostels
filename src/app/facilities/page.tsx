import { PublicLayout } from "@/components/layout/PublicLayout";
import { FacilityCard } from "@/components/facilities/FacilityCard";
import { fetchFacilities } from "@/lib/data";

export const metadata = {
  title: "Facilities",
  description: "WiFi, laundry, food, hot water, security, housekeeping, and more hostel amenities.",
};

export default async function FacilitiesPage() {
  const facilities = await fetchFacilities();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Facilities</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Everything you need for comfortable student living, all under one roof. Designed to help you focus on your studies while we take care of the rest.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <div key={facility.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <FacilityCard facility={facility} index={index} />
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
