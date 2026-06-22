import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { Transport } from "@/types";

interface TransportScheduleProps {
  transport: Transport;
}

export function TransportSchedule({ transport }: TransportScheduleProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="overflow-hidden border-teal-100 shadow-sm">
        <CardHeader className="bg-teal-50 pb-4 border-b border-teal-100">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-xl text-white shadow-sm">
              🏢
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">PG → University</h2>
              <p className="text-xs text-teal-700 font-medium">Pickup: {transport.pickupPgToUniv}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {transport.timingsPgToUniv.map((time) => (
              <li
                key={time}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  🕐
                </span>
                <span className="font-semibold text-slate-700">{time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-indigo-100 shadow-sm">
        <CardHeader className="bg-indigo-50 pb-4 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
              🎓
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">University → PG</h2>
              <p className="text-xs text-indigo-700 font-medium">Pickup: {transport.pickupUnivToPg}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {transport.timingsUnivToPg.map((time) => (
              <li
                key={time}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  🕐
                </span>
                <span className="font-semibold text-slate-700">{time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
