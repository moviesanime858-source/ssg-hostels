"use client";

import { useEffect, useState } from "react";
import { getInquiries, deleteInquiry } from "@/lib/firebase/services";
import type { Inquiry } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch {
      setError("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert("Failed to delete inquiry.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Student Inquiries</h1>
      <p className="mt-1 text-sm text-slate-600">
        View and manage inquiries from interested students.
      </p>

      {inquiries.length === 0 ? (
        <Card className="mt-6">
          <CardContent className="py-12 text-center text-slate-500">
            No inquiries found.
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student Name</th>
                  <th className="px-6 py-4 font-semibold">Phone Number</th>
                  <th className="px-6 py-4 font-semibold">Building</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {inquiry.name}
                    </td>
                    <td className="px-6 py-4">{inquiry.phone}</td>
                    <td className="px-6 py-4">{inquiry.buildingName}</td>
                    <td className="px-6 py-4">
                      {new Date(inquiry.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(inquiry.id)}
                        loading={deletingId === inquiry.id}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
