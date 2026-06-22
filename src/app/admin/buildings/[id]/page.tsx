"use client";

import { useEffect, useState } from "react";
import { getBuildingById } from "@/lib/firebase/services";
import { DEMO_BUILDINGS } from "@/lib/demo-data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { BuildingForm } from "@/components/admin/BuildingForm";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Building } from "@/types";

export default function EditBuildingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    params.then(({ id: buildingId }) => {
      setId(buildingId);
      loadBuilding(buildingId);
    });
  }, [params]);

  async function loadBuilding(buildingId: string) {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        const demo = DEMO_BUILDINGS.find((b) => b.id === buildingId);
        setBuilding(demo ?? null);
        return;
      }
      const data = await getBuildingById(buildingId);
      setBuilding(data);
    } catch {
      setError("Failed to load building.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadBuilding(id)} />;
  if (!building) return <ErrorMessage message="Building not found." />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Building</h1>
      <BuildingForm building={building} />
    </div>
  );
}
