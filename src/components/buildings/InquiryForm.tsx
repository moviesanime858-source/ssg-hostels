"use client";

import { useState } from "react";
import { createInquiry } from "@/lib/firebase/services";
import { Button } from "@/components/ui/Button";

interface InquiryFormProps {
  buildingId: string;
  buildingName: string;
}

export function InquiryForm({ buildingId, buildingName }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both name and phone number.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await createInquiry({
        name: name.trim(),
        phone: phone.trim(),
        buildingId,
        buildingName,
      });
      setSuccess(true);
      setName("");
      setPhone("");
    } catch {
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-emerald-900">Inquiry Sent!</h3>
        <p className="mt-2 text-sm text-emerald-700">
          Thank you for your interest. We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Interested in this Building?</h3>
      <p className="mt-1 text-sm text-slate-600">Leave your details and we&apos;ll get back to you.</p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Your Phone Number"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-3 sm:flex-row pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            loading={loading}
            onClick={(e) => handleSubmit(e)}
          >
            Request Callback
          </Button>
          <Button
            type="button"
            variant="primary"
            className="flex-1"
            loading={loading}
            onClick={(e) => handleSubmit(e)}
          >
            Send Inquiry
          </Button>
        </div>
      </div>
    </form>
  );
}
