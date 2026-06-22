import { BuildingForm } from "@/components/admin/BuildingForm";

export const metadata = {
  title: "Add Building",
};

export default function NewBuildingPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Add Building</h1>
      <BuildingForm />
    </div>
  );
}
