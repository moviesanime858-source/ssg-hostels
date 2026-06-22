import { PublicLayout } from "@/components/layout/PublicLayout";

export default function BuildingDetailsLoading() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 h-10 w-80 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="aspect-[16/10] animate-pulse rounded-2xl bg-slate-200 lg:col-span-3" />
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200 lg:col-span-2" />
        </div>
      </div>
    </PublicLayout>
  );
}
