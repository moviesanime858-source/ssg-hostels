"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getContact, upsertContact } from "@/lib/firebase/services";
import { DEMO_CONTACT } from "@/lib/demo-data";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { ContactInput } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactInput>({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    googleMapsUrl: "",
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
          phone: DEMO_CONTACT.phone,
          whatsapp: DEMO_CONTACT.whatsapp,
          email: DEMO_CONTACT.email ?? "",
          address: DEMO_CONTACT.address,
          googleMapsUrl: DEMO_CONTACT.googleMapsUrl,
        });
        return;
      }
      const data = await getContact();
      if (data) {
        setForm({
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email ?? "",
          address: data.address,
          googleMapsUrl: data.googleMapsUrl,
        });
      }
    } catch {
      setError("Failed to load contact information.");
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
      await upsertContact(form);
      setSuccess(true);
    } catch {
      setError("Failed to save contact information.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  if (loading) return <PageLoader />;
  if (error && !form.phone) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Contact Information</h1>
      <p className="mt-1 text-sm text-slate-600">
        Update phone, WhatsApp, and email links shown across the site.
      </p>

      <Card className="mt-6 max-w-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                placeholder="+919876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                WhatsApp Number
              </label>
              <input
                required
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp: e.target.value }))
                }
                className={inputClass}
                placeholder="919876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
            </div>


            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Contact information saved successfully.
              </p>
            )}

            <Button type="submit" loading={saving}>
              Save Contact
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
