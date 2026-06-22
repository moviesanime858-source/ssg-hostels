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
    monthlyMandadam: 0,
    monthlyInavolu: 0,
    weeklyMandadam: 0,
    weeklyInavolu: 0,
    pickupPgToUniv: "",
    pickupUnivToPg: "",
    timingsPgToUniv: [""],
    timingsUnivToPg: [""],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function load() {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        setForm({ ...DEMO_TRANSPORT });
        return;
      }
      const data = await getTransport();
      if (data) {
        setForm(data);
      } else {
        setForm({ ...DEMO_TRANSPORT });
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
  if (error && !form.pickupPgToUniv) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Transport Settings</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage charges, pickup points, and departure timings.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-6">
        {/* Charges Section */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Transport Charges (₹)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-700">Monthly Charges</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-500">Mandadam Buildings</label>
                  <input
                    type="number"
                    required
                    value={form.monthlyMandadam || ""}
                    onChange={(e) => setForm((f) => ({ ...f, monthlyMandadam: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500">Inavolu Buildings</label>
                  <input
                    type="number"
                    required
                    value={form.monthlyInavolu || ""}
                    onChange={(e) => setForm((f) => ({ ...f, monthlyInavolu: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-700">Weekly Charges</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-500">Mandadam Buildings</label>
                  <input
                    type="number"
                    required
                    value={form.weeklyMandadam || ""}
                    onChange={(e) => setForm((f) => ({ ...f, weeklyMandadam: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500">Inavolu Buildings</label>
                  <input
                    type="number"
                    required
                    value={form.weeklyInavolu || ""}
                    onChange={(e) => setForm((f) => ({ ...f, weeklyInavolu: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Points & Timings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-2">PG → University</h2>
              <div>
                <label className="block text-xs font-medium text-slate-500">Pickup Point</label>
                <input
                  required
                  value={form.pickupPgToUniv}
                  onChange={(e) => setForm((f) => ({ ...f, pickupPgToUniv: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. Hostel Mess"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-slate-500">Departure Timings</label>
                  <Button type="button" variant="outline" size="sm" onClick={() => setForm(f => ({ ...f, timingsPgToUniv: [...f.timingsPgToUniv, ""] }))}>
                    Add Time
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.timingsPgToUniv.map((time, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={time}
                        onChange={(e) => {
                          const updated = [...form.timingsPgToUniv];
                          updated[i] = e.target.value;
                          setForm(f => ({ ...f, timingsPgToUniv: updated }));
                        }}
                        className={inputClass + " mt-0 flex-1"}
                        placeholder="e.g. 8:30 AM"
                      />
                      <button
                        type="button"
                        onClick={() => setForm(f => ({ ...f, timingsPgToUniv: f.timingsPgToUniv.filter((_, idx) => idx !== i) }))}
                        className="text-red-600 text-xs px-2"
                      >
                        Drop
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-2">University → PG</h2>
              <div>
                <label className="block text-xs font-medium text-slate-500">Pickup Point</label>
                <input
                  required
                  value={form.pickupUnivToPg}
                  onChange={(e) => setForm((f) => ({ ...f, pickupUnivToPg: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. VIT-AP Main Gate"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-slate-500">Departure Timings</label>
                  <Button type="button" variant="outline" size="sm" onClick={() => setForm(f => ({ ...f, timingsUnivToPg: [...f.timingsUnivToPg, ""] }))}>
                    Add Time
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.timingsUnivToPg.map((time, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={time}
                        onChange={(e) => {
                          const updated = [...form.timingsUnivToPg];
                          updated[i] = e.target.value;
                          setForm(f => ({ ...f, timingsUnivToPg: updated }));
                        }}
                        className={inputClass + " mt-0 flex-1"}
                        placeholder="e.g. 4:00 PM"
                      />
                      <button
                        type="button"
                        onClick={() => setForm(f => ({ ...f, timingsUnivToPg: f.timingsUnivToPg.filter((_, idx) => idx !== i) }))}
                        className="text-red-600 text-xs px-2"
                      >
                        Drop
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
          Save Transport Configuration
        </Button>
      </form>
    </div>
  );
}
