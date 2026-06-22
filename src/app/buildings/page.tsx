import { PublicLayout } from "@/components/layout/PublicLayout";
import { BuildingCard } from "@/components/buildings/BuildingCard";
import { fetchBuildings } from "@/lib/data";

export const metadata = {
  title: "Buildings",
  description: "Browse all hostel buildings with rent, vacancy, and location details.",
};

export default async function BuildingsPage() {
  const buildings = await fetchBuildings();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            All Buildings
          </h1>
          <p className="mt-2 text-slate-600">
            {buildings.length} building{buildings.length !== 1 ? "s" : ""} available
            for student accommodation.
          </p>
        </div>

        {buildings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-medium text-slate-700">
              No buildings listed yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for available hostel accommodations.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buildings.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
