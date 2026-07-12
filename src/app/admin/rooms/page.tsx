"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getBuildings,
} from "@/lib/firebase/services";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { Room, RoomInput, Building } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const INITIAL_FORM: RoomInput = {
  roomNumber: "",
  buildingId: "",
  roomType: "2 Sharing",
  monthlyRent: 0,
  capacity: 2,
  occupants: 0,
  status: "available",
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<RoomInput>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        setError("Firebase is not configured.");
        return;
      }
      const [roomsData, buildingsData] = await Promise.all([
        getRooms(),
        getBuildings(),
      ]);
      setRooms(roomsData);
      setBuildings(buildingsData);
      
      if (buildingsData.length > 0) {
        setForm(f => ({ ...f, buildingId: buildingsData[0].id }));
      }
    } catch {
      setError("Failed to load rooms data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(room: Room) {
    setEditingId(room.id);
    setForm({
      roomNumber: room.roomNumber,
      buildingId: room.buildingId,
      roomType: room.roomType,
      monthlyRent: room.monthlyRent,
      capacity: room.capacity,
      occupants: room.occupants,
      status: room.status,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      ...INITIAL_FORM,
      buildingId: buildings.length > 0 ? buildings[0].id : "",
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateRoom(editingId, form);
        setRooms((prev) =>
          prev.map((r) => (r.id === editingId ? { ...r, ...form } : r))
        );
      } else {
        const id = await createRoom(form);
        setRooms((prev) => [{ id, ...form }, ...prev]);
      }
      resetForm();
    } catch {
      alert("Failed to save room.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this room?")) return;
    try {
      await deleteRoom(id);
      setRooms((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete room.");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Rooms Management</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage individual rooms across all buildings.
      </p>

      <Card className="mt-6 max-w-3xl">
        <CardContent>
          <h2 className="font-bold text-slate-900">
            {editingId ? "Edit Room" : "Add Room"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Room Number</label>
              <input
                required
                value={form.roomNumber}
                onChange={(e) => setForm((f) => ({ ...f, roomNumber: e.target.value }))}
                className={inputClass}
                placeholder="e.g. 101"
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
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
                {buildings.length === 0 && <option value="">No buildings found</option>}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Room Type</label>
              <select
                required
                value={form.roomType}
                onChange={(e) => setForm((f) => ({ ...f, roomType: e.target.value as RoomInput["roomType"] }))}
                className={inputClass}
              >
                <option value="2 Sharing">2 Sharing</option>
                <option value="3 Sharing">3 Sharing</option>
                <option value="4 Sharing">4 Sharing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Monthly Rent</label>
              <input
                required
                type="number"
                min="0"
                value={form.monthlyRent}
                onChange={(e) => setForm((f) => ({ ...f, monthlyRent: parseInt(e.target.value) || 0 }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Capacity</label>
              <input
                required
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) => setForm((f) => ({ ...f, capacity: parseInt(e.target.value) || 1 }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Occupants</label>
              <input
                required
                type="number"
                min="0"
                value={form.occupants}
                onChange={(e) => setForm((f) => ({ ...f, occupants: parseInt(e.target.value) || 0 }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                required
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as RoomInput["status"] }))}
                className={inputClass}
              >
                <option value="available">Available</option>
                <option value="full">Full</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="sm:col-span-2 flex gap-2 mt-2">
              <Button type="submit" loading={saving}>
                {editingId ? "Update Room" : "Add Room"}
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

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Room Number</th>
                <th className="px-6 py-4 font-semibold">Building</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Rent</th>
                <th className="px-6 py-4 font-semibold">Occupancy</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rooms.map((room) => {
                const bName = buildings.find(b => b.id === room.buildingId)?.name || "Unknown Building";
                return (
                  <tr key={room.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{room.roomNumber}</td>
                    <td className="px-6 py-4">{bName}</td>
                    <td className="px-6 py-4">{room.roomType}</td>
                    <td className="px-6 py-4">₹{room.monthlyRent}</td>
                    <td className="px-6 py-4">{room.occupants}/{room.capacity}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        room.status === "available" ? "bg-emerald-100 text-emerald-700" :
                        room.status === "full" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => startEdit(room)} className="text-teal-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No rooms found. Add one above.
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
