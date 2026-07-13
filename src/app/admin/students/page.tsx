"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getRooms,
  getBuildings,
} from "@/lib/firebase/services";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { Student, StudentInput, Room, Building, VacationPeriod } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const INITIAL_FORM: StudentInput = {
  name: "",
  phone: "",
  joinedDate: "",
  monthlyFee: 0,
  feePaid: 0,
  remainingFee: 0,
  roomId: "",
  buildingId: "",
  status: "active",
  vacationPeriods: [],
};

function calculateMonthsPassed(joinedDateStr: string, vacationPeriods: VacationPeriod[] = []): number {
  if (!joinedDateStr) return 0;
  const joined = new Date(joinedDateStr);
  const now = new Date();
  if (isNaN(joined.getTime())) return 0;

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(0, Math.floor((now.getTime() - joined.getTime()) / msPerDay));

  let vacationDays = 0;
  for (const period of vacationPeriods) {
    if (!period.startDate) continue;
    const start = new Date(period.startDate);
    const end = period.endDate ? new Date(period.endDate) : now;
    
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start.getTime() > end.getTime()) continue;
    
    const actualStart = start.getTime() < joined.getTime() ? joined : start;
    const actualEnd = end.getTime() > now.getTime() ? now : end;
    
    if (actualStart.getTime() < actualEnd.getTime()) {
      vacationDays += Math.floor((actualEnd.getTime() - actualStart.getTime()) / msPerDay);
    }
  }

  const billableDays = Math.max(0, totalDays - vacationDays);
  // Using 30 days as a standard hostel billing month
  return Math.floor(billableDays / 30) + 1;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<StudentInput>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        setError("Firebase is not configured.");
        return;
      }
      const [studentsData, roomsData, buildingsData] = await Promise.all([
        getStudents(),
        getRooms(),
        getBuildings(),
      ]);
      setStudents(studentsData);
      setRooms(roomsData);
      setBuildings(buildingsData);
      
      if (buildingsData.length > 0) {
        setForm(f => ({ ...f, buildingId: buildingsData[0].id }));
      }
      if (roomsData.length > 0) {
        setForm(f => ({ ...f, roomId: roomsData[0].id }));
      }
    } catch {
      setError("Failed to load students data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Update remaining fee automatically
  useEffect(() => {
    const monthsPassed = calculateMonthsPassed(form.joinedDate, form.vacationPeriods);
    const totalOwed = form.monthlyFee * monthsPassed;
    const remaining = totalOwed - form.feePaid;
    
    if (remaining !== form.remainingFee) {
      setForm(f => ({ ...f, remainingFee: remaining }));
    }
  }, [form.monthlyFee, form.feePaid, form.joinedDate, form.vacationPeriods, form.remainingFee]);

  function startEdit(student: Student) {
    setEditingId(student.id);
    setForm({
      name: student.name,
      phone: student.phone,
      joinedDate: student.joinedDate,
      monthlyFee: student.monthlyFee,
      feePaid: student.feePaid,
      remainingFee: student.remainingFee,
      roomId: student.roomId,
      buildingId: student.buildingId,
      status: student.status,
      vacationPeriods: student.vacationPeriods || [],
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      ...INITIAL_FORM,
      buildingId: buildings.length > 0 ? buildings[0].id : "",
      roomId: rooms.length > 0 ? rooms[0].id : "",
      joinedDate: new Date().toISOString().split("T")[0], // Today
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateStudent(editingId, form);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
        );
      } else {
        const id = await createStudent(form);
        setStudents((prev) => [{ id, ...form }, ...prev]);
      }
      resetForm();
    } catch {
      alert("Failed to save student.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this student record?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete student.");
    }
  }

  async function togglePause(student: Student) {
    const today = new Date().toISOString().split("T")[0];
    const periods = student.vacationPeriods || [];
    const activeIndex = periods.findIndex(p => !p.endDate);
    
    let updatedPeriods = [...periods];
    
    if (activeIndex >= 0) {
      // Resume: set endDate to today
      updatedPeriods[activeIndex].endDate = today;
    } else {
      // Pause: add new period starting today
      updatedPeriods.push({ startDate: today, endDate: "" });
    }
    
    try {
      await updateStudent(student.id, { ...student, vacationPeriods: updatedPeriods });
      setStudents(prev => prev.map(s => s.id === student.id ? { ...s, vacationPeriods: updatedPeriods } : s));
    } catch {
      alert("Failed to update pause state.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Student Records</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage student details, room assignments, and fee payments.
      </p>

      <Card className="mt-6 max-w-4xl">
        <CardContent>
          <div className="flex items-center justify-between mt-4">
            <h2 className="font-bold text-slate-900">
              {editingId ? "Edit Student" : "Add New Student"}
            </h2>
            {!editingId && form.joinedDate === "" && (
               <Button type="button" size="sm" variant="outline" onClick={resetForm}>
                 Open Add Form
               </Button>
            )}
          </div>
          
          {(editingId || form.joinedDate !== "") && (
            <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Joined Date</label>
                <input
                  required
                  type="date"
                  value={form.joinedDate}
                  onChange={(e) => setForm((f) => ({ ...f, joinedDate: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Building</label>
                <select
                  required
                  value={form.buildingId}
                  onChange={(e) => setForm((f) => ({ ...f, buildingId: e.target.value }))}
                  className={inputClass}
                >
                  <option value="">Select Building...</option>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Room</label>
                <select
                  required
                  value={form.roomId}
                  onChange={(e) => setForm((f) => ({ ...f, roomId: e.target.value }))}
                  className={inputClass}
                >
                  <option value="">Select Room...</option>
                  {rooms
                    .filter(r => !form.buildingId || r.buildingId === form.buildingId)
                    .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.roomNumber} ({r.roomType})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Status</label>
                <select
                  required
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as StudentInput["status"] }))}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              {/* Fee Section */}
              <div className="md:col-span-3 border-t border-slate-200 mt-2 pt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Monthly Fee</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.monthlyFee}
                    onChange={(e) => setForm((f) => ({ ...f, monthlyFee: parseInt(e.target.value) || 0 }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Total Payments Made (Lifetime)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.feePaid}
                    onChange={(e) => setForm((f) => ({ ...f, feePaid: parseInt(e.target.value) || 0 }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Balance Status</label>
                  <input
                    readOnly
                    type="text"
                    value={form.remainingFee < 0 ? `Advance: ₹${Math.abs(form.remainingFee)}` : `Due: ₹${form.remainingFee}`}
                    className={`${inputClass} bg-slate-50 font-bold ${form.remainingFee < 0 ? "text-indigo-600" : form.remainingFee > 0 ? "text-red-600" : "text-emerald-600"}`}
                  />
                </div>
              </div>

              {/* Vacation Periods Section */}
              <div className="md:col-span-3 border-t border-slate-200 mt-2 pt-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Vacation Periods (Billing Paused)</label>
                  <Button type="button" size="sm" variant="outline" onClick={() => {
                    setForm(f => ({
                      ...f,
                      vacationPeriods: [...(f.vacationPeriods || []), { startDate: "", endDate: "" }]
                    }));
                  }}>
                    + Add Break
                  </Button>
                </div>
                
                {form.vacationPeriods && form.vacationPeriods.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {form.vacationPeriods.map((vp, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-xs text-slate-500 mb-1">From Date</label>
                          <input
                            type="date"
                            value={vp.startDate}
                            onChange={(e) => {
                              const newVp = [...form.vacationPeriods!];
                              newVp[index].startDate = e.target.value;
                              setForm(f => ({ ...f, vacationPeriods: newVp }));
                            }}
                            className={inputClass}
                          />
                        </div>
                        <span className="text-slate-400 mt-5">to</span>
                        <div className="flex-1">
                          <label className="block text-xs text-slate-500 mb-1">To Date</label>
                          <input
                            type="date"
                            value={vp.endDate}
                            onChange={(e) => {
                              const newVp = [...form.vacationPeriods!];
                              newVp[index].endDate = e.target.value;
                              setForm(f => ({ ...f, vacationPeriods: newVp }));
                            }}
                            className={inputClass}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newVp = form.vacationPeriods!.filter((_, i) => i !== index);
                            setForm(f => ({ ...f, vacationPeriods: newVp }));
                          }}
                          className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-3 flex gap-2 mt-4">
                <Button type="submit" loading={saving}>
                  {editingId ? "Update Student" : "Save Student"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setForm(INITIAL_FORM)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Name / Phone</th>
                <th className="px-6 py-4 font-semibold">Room Info</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Fee (Monthly)</th>
                <th className="px-6 py-4 font-semibold">Paid / Rem.</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((student) => {
                const bName = buildings.find(b => b.id === student.buildingId)?.name || "Unknown Building";
                const room = rooms.find(r => r.id === student.roomId);
                const rNum = room ? room.roomNumber : "Unknown Room";
                
                const monthsPassed = calculateMonthsPassed(student.joinedDate, student.vacationPeriods);
                const totalOwed = student.monthlyFee * monthsPassed;
                const dynamicRemaining = totalOwed - student.feePaid;
                const isPaused = (student.vacationPeriods || []).some(p => !p.endDate);
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{student.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">Room {rNum}</div>
                      <div className="text-xs text-slate-500 mt-1 truncate max-w-[120px]" title={bName}>{bName}</div>
                    </td>
                    <td className="px-6 py-4">
                      {student.joinedDate || "N/A"}
                      <div className="text-xs text-slate-400 mt-1">{monthsPassed} month(s)</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">₹{student.monthlyFee}</td>
                    <td className="px-6 py-4">
                      <div className="text-emerald-600 font-medium">₹{student.feePaid}</div>
                      <div className={`text-xs mt-1 font-semibold ${dynamicRemaining < 0 ? "text-indigo-600" : dynamicRemaining > 0 ? "text-red-600" : "text-slate-400"}`}>
                        {dynamicRemaining < 0 ? `Advance: ₹${Math.abs(dynamicRemaining)}` : `Due: ₹${dynamicRemaining}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          student.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                        {isPaused && (
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700">
                            Paused
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 items-center">
                        <button onClick={() => togglePause(student)} className={`text-xs font-medium ${isPaused ? "text-emerald-600 hover:text-emerald-700" : "text-amber-600 hover:text-amber-700"}`}>
                          {isPaused ? "▶ Resume" : "⏸ Pause"}
                        </button>
                        <button onClick={() => startEdit(student)} className="text-teal-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No students found. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
