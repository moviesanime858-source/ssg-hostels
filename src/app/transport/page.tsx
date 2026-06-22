import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { TransportSchedule } from "@/components/transport/TransportSchedule";

const morningTrips = [
  { time: "8:30 AM" },
  { time: "9:00 AM" },
  { time: "9:30 AM" },
  { time: "1:30 PM" },
];

const returnTrips = [
  { time: "4:00 PM" },
  { time: "5:00 PM" },
  { time: "6:00 PM" },
  { time: "7:30 PM" },
];

export const metadata = {
  title: "Transport",
  description: "Auto timings, pickup points, and transport charges for hostel students.",
};

export default async function TransportPage() {

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
          <TransportSchedule morningTrips={morningTrips} returnTrips={returnTrips} />
        </div>

        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Transport Charges</h2>
            <p className="mt-2 text-sm text-slate-600">
              Transport charges vary depending on building location and distance from VIT-AP.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-teal-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <h3 className="text-lg font-bold text-teal-900 text-center">Mandadam Buildings</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600">Monthly</p>
                    <p className="mt-2 text-3xl font-bold text-teal-700">₹800</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600">Weekly</p>
                    <p className="mt-2 text-3xl font-bold text-teal-700">₹250</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-indigo-50 border-b border-indigo-100">
                <h3 className="text-lg font-bold text-indigo-900 text-center">Inavolu Buildings</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600">Monthly</p>
                    <p className="mt-2 text-3xl font-bold text-indigo-700">₹500</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600">Weekly</p>
                    <p className="mt-2 text-3xl font-bold text-indigo-700">₹150</p>
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
