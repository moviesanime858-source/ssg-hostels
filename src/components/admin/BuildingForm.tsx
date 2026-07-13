"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createBuilding,
  updateBuilding,
  uploadImage,
} from "@/lib/firebase/services";
import type { Building, BuildingInput, VacancyStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface BuildingFormProps {
  building?: Building;
}

const emptyForm: BuildingInput = {
  name: "",
  description: "",
  images: [],
  roomTypes: [{ name: "Double Sharing", rent: 5000 }],
  feeStructure: [{ label: "Security Deposit", amount: 5000, note: "Refundable" }],
  facilities: [],
  vacancyStatus: "available",
  distanceFromUniversity: "",
  googleMapsUrl: "",
};

export function BuildingForm({ building }: BuildingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<BuildingInput>(
    building
      ? {
          name: building.name,
          description: building.description,
          images: building.images,
          roomTypes: building.roomTypes,
          feeStructure: building.feeStructure,
          facilities: building.facilities,
          vacancyStatus: building.vacancyStatus,
          distanceFromUniversity: building.distanceFromUniversity,
          googleMapsUrl: building.googleMapsUrl,
          startingRent: building.startingRent,
        }
      : emptyForm
  );
  const [facilityInput, setFacilityInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof BuildingInput>(
    key: K,
    value: BuildingInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addImageUrl() {
    if (!imageUrlInput.trim()) return;
    updateField("images", [...form.images, imageUrlInput.trim()]);
    setImageUrlInput("");
  }

  function addRoomType() {
    updateField("roomTypes", [
      ...form.roomTypes,
      { name: "", rent: 0 },
    ]);
  }

  function updateRoomType(
    index: number,
    field: "name" | "rent" | "description",
    value: string | number
  ) {
    const updated = [...form.roomTypes];
    updated[index] = { ...updated[index], [field]: value };
    updateField("roomTypes", updated);
  }

  function removeRoomType(index: number) {
    updateField(
      "roomTypes",
      form.roomTypes.filter((_, i) => i !== index)
    );
  }

  function addFeeItem() {
    updateField("feeStructure", [
      ...form.feeStructure,
      { label: "", amount: 0 },
    ]);
  }

  function updateFeeItem(
    index: number,
    field: "label" | "amount" | "note",
    value: string | number
  ) {
    const updated = [...form.feeStructure];
    updated[index] = { ...updated[index], [field]: value };
    updateField("feeStructure", updated);
  }

  function removeFeeItem(index: number) {
    updateField(
      "feeStructure",
      form.feeStructure.filter((_, i) => i !== index)
    );
  }

  function addFacility() {
    if (!facilityInput.trim()) return;
    updateField("facilities", [...form.facilities, facilityInput.trim()]);
    setFacilityInput("");
  }

  function removeFacility(index: number) {
    updateField(
      "facilities",
      form.facilities.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const startingRent =
      form.roomTypes.length > 0
        ? Math.min(...form.roomTypes.map((r) => r.rent))
        : undefined;

    const payload: BuildingInput = { ...form, startingRent };

    try {
      if (building) {
        await updateBuilding(building.id, payload);
      } else {
        await createBuilding(payload);
      }
      router.push("/admin/buildings");
    } catch {
      setError("Failed to save building. Check Firebase configuration.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-bold text-slate-900">Basic Info</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Building Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Distance from University
              </label>
              <input
                required
                placeholder="e.g. 0.5 km"
                value={form.distanceFromUniversity}
                onChange={(e) =>
                  updateField("distanceFromUniversity", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Vacancy Status
              </label>
              <select
                value={form.vacancyStatus}
                onChange={(e) =>
                  updateField("vacancyStatus", e.target.value as VacancyStatus)
                }
                className={inputClass}
              >
                <option value="available">Available</option>
                <option value="limited">Limited Seats</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Google Maps URL
            </label>
            <input
              type="url"
              value={form.googleMapsUrl}
              onChange={(e) => updateField("googleMapsUrl", e.target.value)}
              className={inputClass}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-bold text-slate-900">Images</h2>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste image URL here (e.g. from Google Drive, Imgur)"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              className={inputClass + " mt-0 flex-1"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImageUrl();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addImageUrl}>
              Add Image
            </Button>
          </div>
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.images.map((url, i) => (
                <div key={url} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Building ${i + 1}`}
                    className="h-20 w-28 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "images",
                        form.images.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Room Types</h2>
            <Button type="button" variant="outline" size="sm" onClick={addRoomType}>
              Add Room
            </Button>
          </div>
          {form.roomTypes.map((room, index) => (
            <div key={index} className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
              <input
                placeholder="Room name"
                value={room.name}
                onChange={(e) => updateRoomType(index, "name", e.target.value)}
                className={inputClass + " mt-0"}
              />
              <input
                type="number"
                placeholder="Rent"
                value={room.rent || ""}
                onChange={(e) =>
                  updateRoomType(index, "rent", Number(e.target.value))
                }
                className={inputClass + " mt-0"}
              />
              <div className="flex gap-2">
                <input
                  placeholder="Description (optional)"
                  value={room.description ?? ""}
                  onChange={(e) =>
                    updateRoomType(index, "description", e.target.value)
                  }
                  className={inputClass + " mt-0 flex-1"}
                />
                <button
                  type="button"
                  onClick={() => removeRoomType(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Fee Structure</h2>
            <Button type="button" variant="outline" size="sm" onClick={addFeeItem}>
              Add Fee
            </Button>
          </div>
          {form.feeStructure.map((fee, index) => (
            <div key={index} className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
              <input
                placeholder="Label"
                value={fee.label}
                onChange={(e) => updateFeeItem(index, "label", e.target.value)}
                className={inputClass + " mt-0"}
              />
              <input
                type="number"
                placeholder="Amount"
                value={fee.amount || ""}
                onChange={(e) =>
                  updateFeeItem(index, "amount", Number(e.target.value))
                }
                className={inputClass + " mt-0"}
              />
              <div className="flex gap-2">
                <input
                  placeholder="Note (optional)"
                  value={fee.note ?? ""}
                  onChange={(e) => updateFeeItem(index, "note", e.target.value)}
                  className={inputClass + " mt-0 flex-1"}
                />
                <button
                  type="button"
                  onClick={() => removeFeeItem(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-bold text-slate-900">Facilities</h2>
          <div className="flex gap-2">
            <input
              value={facilityInput}
              onChange={(e) => setFacilityInput(e.target.value)}
              placeholder="e.g. WiFi"
              className={inputClass + " mt-0 flex-1"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFacility();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addFacility}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.facilities.map((f, i) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-800"
              >
                {f}
                <button type="button" onClick={() => removeFacility(i)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" loading={saving}>
          {building ? "Update Building" : "Create Building"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/buildings")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
