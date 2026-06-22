import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { fetchContact } from "@/lib/data";

export const metadata = {
  title: "Fees & Packages",
  description: "View available accommodation packages and room types for SSG HOSTELS.",
};

const packages = [
  "Monthly Package",
  "Half-Yearly Package (5 Months)",
  "Yearly Package (10 Months)",
];

export default async function FeesPage() {
  const contact = await fetchContact();
  const whatsappMessage = "Hi, I would like to know the current fee structure for your hostel packages.";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Fees & Packages
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            We offer flexible payment packages for both AC and Non-AC accommodations to suit your needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Non-AC Accommodation */}
          <Card className="border-teal-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-teal-50 border-b border-teal-100 pb-4">
              <div className="flex items-center gap-3 justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-xl text-white shadow-sm">
                  🛏️
                </span>
                <h2 className="text-xl font-bold text-teal-900">Non-AC Accommodation</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Available Packages</h3>
              <ul className="space-y-3">
                {packages.map((pkg, index) => (
                  <li key={index} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                      ✓
                    </span>
                    <span className="font-medium text-slate-700">{pkg}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* AC Accommodation */}
          <Card className="border-indigo-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100 pb-4">
              <div className="flex items-center gap-3 justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
                  ❄️
                </span>
                <h2 className="text-xl font-bold text-indigo-900">AC Accommodation</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Available Packages</h3>
              <ul className="space-y-3">
                {packages.map((pkg, index) => (
                  <li key={index} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      ✓
                    </span>
                    <span className="font-medium text-slate-700">{pkg}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Notice & Contact */}
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10 text-center shadow-sm">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl mb-6 shadow-sm">
            💬
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Contact Management for Current Pricing
          </h2>
          <p className="text-orange-800 font-medium mb-8 max-w-xl mx-auto">
            Pricing may vary based on room availability, room type, and selected package. Reach out to us directly for the latest fee structures and current availability.
          </p>
          
          <div className="max-w-md mx-auto">
            <ContactButtons
              phone={contact.phone}
              whatsapp={contact.whatsapp}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
