"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBuildings, deleteBuilding } from "@/lib/firebase/services";
import { DEMO_BUILDINGS } from "@/lib/demo-data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { Building } from "@/types";
import { Button } from "@/components/ui/Button";
import { VacancyBadge } from "@/components/ui/VacancyBadge";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { formatCurrency } from "@/lib/utils";

export default function AdminBuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadBuildings() {
    setLoading(true);
    setError("");
    try {
      if (!isFirebaseConfigured()) {
        setBuildings(DEMO_BUILDINGS);
        return;
      }
      const data = await getBuildings();
      setBuildings(data);
    } catch {
      setError("Failed to load buildings. Check Firebase configuration.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBuildings();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this building?")) return;
    setDeletingId(id);
    try {
      await deleteBuilding(id);
      setBuildings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Failed to delete building.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={loadBuildings} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Buildings</h1>
          <p className="mt-1 text-sm text-slate-600">
            {buildings.length} building{buildings.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Button href="/admin/buildings/new">Add Building</Button>
      </div>

      {!isFirebaseConfigured() && (
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Firebase is not configured. Showing demo data. Add your Firebase credentials to manage real content.
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
        <input 
          type="search"
          placeholder="Search buildings..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Rent</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Vacancy</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Distance</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {buildings
              .filter(b => 
                b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                b.distanceFromUniversity.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((building) => (
              <tr key={building.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {building.name}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {building.startingRent
                    ? formatCurrency(building.startingRent)
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <VacancyBadge status={building.vacancyStatus} />
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {building.distanceFromUniversity}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/buildings/${building.id}`}
                      className="text-teal-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(building.id)}
                      disabled={deletingId === building.id}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deletingId === building.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {buildings.length === 0 && (
          <p className="p-8 text-center text-slate-500">No buildings yet.</p>
        )}
      </div>
    </div>
  );
}
