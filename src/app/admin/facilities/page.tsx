"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getFacilities,
  upsertFacility,
  deleteFacility,
} from "@/lib/firebase/services";
import { DEMO_FACILITIES } from "@/lib/demo-data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { FacilityItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const ICON_OPTIONS = [
  "wifi",
  "laundry",
  "food",
  "hot-water",
  "security",
  "power",
  "housekeeping",
  "study",
  "default",
];

export default function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "", icon: "default" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        setFacilities(DEMO_FACILITIES);
        return;
      }
      const data = await getFacilities();
      setFacilities(data);
    } catch {
      setError("Failed to load facilities.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(facility: FacilityItem) {
    setEditingId(facility.id);
    setForm({
      name: facility.name,
      description: facility.description,
      icon: facility.icon,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm({ name: "", description: "", icon: "default" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const id = await upsertFacility(editingId, form);
      if (editingId) {
        setFacilities((prev) =>
          prev.map((f) => (f.id === editingId ? { ...f, ...form } : f))
        );
      } else {
        setFacilities((prev) => [...prev, { id, ...form }]);
      }
      resetForm();
    } catch {
      alert("Failed to save facility.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this facility?")) return;
    try {
      await deleteFacility(id);
      setFacilities((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert("Failed to delete facility.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Facilities</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage amenities displayed on the facilities page.
      </p>

      <Card className="mt-6 max-w-2xl">
        <CardContent>
          <h2 className="font-bold text-slate-900">
            {editingId ? "Edit Facility" : "Add Facility"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Icon</label>
              <select
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className={inputClass}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" loading={saving}>
                {editingId ? "Update" : "Add"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-3">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-slate-900">{facility.name}</p>
              <p className="text-sm text-slate-600">{facility.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => startEdit(facility)}
                className="text-sm text-teal-700 hover:underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(facility.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
