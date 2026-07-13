import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { TransportSchedule } from "@/components/transport/TransportSchedule";
import { fetchTransport } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Transport",
  description: "Auto timings, pickup points, and transport charges for hostel students.",
};

export default async function TransportPage() {
  const transport = await fetchTransport();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Transport
          </h1>
          <p className="mt-2 text-slate-600">
            Daily auto service between hostel and university campus.
          </p>
        </div>

        <div className="mb-10">
          <TransportSchedule transport={transport} />
        </div>

        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Transport Charges</h2>
            <p className="mt-2 text-sm text-slate-600">
              Transport charges vary depending on building location and distance from VIT-AP.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-teal-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 group-hover:from-teal-100 group-hover:to-emerald-100 transition-colors">
                <h3 className="text-lg font-bold text-teal-900 text-center">Mandadam Buildings</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monthly</p>
                    <p className="mt-2 text-4xl font-extrabold text-teal-700">{formatCurrency(transport.monthlyMandadam)}</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Weekly</p>
                    <p className="mt-2 text-4xl font-extrabold text-teal-700">{formatCurrency(transport.weeklyMandadam)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100 group-hover:from-indigo-100 group-hover:to-blue-100 transition-colors">
                <h3 className="text-lg font-bold text-indigo-900 text-center">Inavolu Buildings</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monthly</p>
                    <p className="mt-2 text-4xl font-extrabold text-indigo-700">{formatCurrency(transport.monthlyInavolu)}</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Weekly</p>
                    <p className="mt-2 text-4xl font-extrabold text-indigo-700">{formatCurrency(transport.weeklyInavolu)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
