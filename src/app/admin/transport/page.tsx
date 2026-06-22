"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getTransport, upsertTransport } from "@/lib/firebase/services";
import { DEMO_TRANSPORT } from "@/lib/demo-data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { TransportInput } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function AdminTransportPage() {
  const [form, setForm] = useState<TransportInput>({
    autoTimings: [],
    pickupPoints: [],
    charges: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function load() {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        setForm({
          autoTimings: DEMO_TRANSPORT.autoTimings,
          pickupPoints: DEMO_TRANSPORT.pickupPoints,
          charges: DEMO_TRANSPORT.charges,
        });
        return;
      }
      const data = await getTransport();
      if (data) {
        setForm({
          autoTimings: data.autoTimings,
          pickupPoints: data.pickupPoints,
          charges: data.charges,
        });
      }
    } catch {
      setError("Failed to load transport data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await upsertTransport(form);
      setSuccess(true);
    } catch {
      setError("Failed to save transport details.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  if (loading) return <PageLoader />;
  if (error && !form.autoTimings.length)
    return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Transport</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage auto timings, pickup points, and charges.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-6">
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Auto Timings</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    autoTimings: [...f.autoTimings, ""],
                  }))
                }
              >
                Add Timing
              </Button>
            </div>
            {form.autoTimings.map((timing, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={timing}
                  onChange={(e) => {
                    const updated = [...form.autoTimings];
                    updated[i] = e.target.value;
                    setForm((f) => ({ ...f, autoTimings: updated }));
                  }}
                  placeholder="e.g. 7:00 AM – University"
                  className={inputClass + " mt-0 flex-1"}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      autoTimings: f.autoTimings.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Pickup Points</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    pickupPoints: [...f.pickupPoints, { name: "", time: "" }],
                  }))
                }
              >
                Add Point
              </Button>
            </div>
            {form.pickupPoints.map((point, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={point.name}
                  onChange={(e) => {
                    const updated = [...form.pickupPoints];
                    updated[i] = { ...updated[i], name: e.target.value };
                    setForm((f) => ({ ...f, pickupPoints: updated }));
                  }}
                  placeholder="Point name"
                  className={inputClass + " mt-0 flex-1"}
                />
                <input
                  value={point.time}
                  onChange={(e) => {
                    const updated = [...form.pickupPoints];
                    updated[i] = { ...updated[i], time: e.target.value };
                    setForm((f) => ({ ...f, pickupPoints: updated }));
                  }}
                  placeholder="Time"
                  className={inputClass + " mt-0 w-32"}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      pickupPoints: f.pickupPoints.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Charges</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    charges: [...f.charges, { label: "", amount: 0 }],
                  }))
                }
              >
                Add Charge
              </Button>
            </div>
            {form.charges.map((charge, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={charge.label}
                  onChange={(e) => {
                    const updated = [...form.charges];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setForm((f) => ({ ...f, charges: updated }));
                  }}
                  placeholder="Label"
                  className={inputClass + " mt-0 flex-1"}
                />
                <input
                  type="number"
                  value={charge.amount || ""}
                  onChange={(e) => {
                    const updated = [...form.charges];
                    updated[i] = {
                      ...updated[i],
                      amount: Number(e.target.value),
                    };
                    setForm((f) => ({ ...f, charges: updated }));
                  }}
                  placeholder="Amount"
                  className={inputClass + " mt-0 w-28"}
                />
                <input
                  value={charge.note ?? ""}
                  onChange={(e) => {
                    const updated = [...form.charges];
                    updated[i] = { ...updated[i], note: e.target.value };
                    setForm((f) => ({ ...f, charges: updated }));
                  }}
                  placeholder="Note"
                  className={inputClass + " mt-0 flex-1"}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      charges: f.charges.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Transport details saved successfully.
          </p>
        )}

        <Button type="submit" loading={saving}>
          Save Transport
        </Button>
      </form>
    </div>
  );
}
