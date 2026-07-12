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

const roomTypes = [
  "2 Sharing",
  "3 Sharing",
  "4 Sharing",
];

export default async function FeesPage() {
  const contact = await fetchContact();
  const whatsappMessage = "Hi, I would like to know the current fee structure for your hostel packages.";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Packages</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            We offer flexible payment packages for both AC and Non-AC accommodations to perfectly suit your needs and budget.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {/* Non-AC Accommodation */}
          <div className="animate-fade-in-up">
            <Card className="border-teal-100 shadow-xl shadow-teal-900/5 overflow-hidden rounded-[2rem] h-full transition-transform hover:-translate-y-2 duration-300">
              <CardHeader className="bg-gradient-to-br from-teal-50 to-emerald-50 border-b border-teal-100 pb-8 pt-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-3xl text-white shadow-lg shadow-teal-500/20">
                    🛏️
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-teal-950">Non-AC Accommodation</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-8 bg-white">
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Room Types</h3>
                  <div className="flex flex-wrap justify-center gap-3 px-2">
                    {roomTypes.map((room, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        {room}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Available Packages</h3>
                <ul className="space-y-4 px-2">
                  {packages.map((pkg, index) => (
                    <li key={index} className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:bg-teal-50/50 hover:border-teal-200">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-700 group-hover:text-teal-900 transition-colors">{pkg}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* AC Accommodation */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <Card className="border-indigo-100 shadow-xl shadow-indigo-900/5 overflow-hidden rounded-[2rem] h-full transition-transform hover:-translate-y-2 duration-300">
              <CardHeader className="bg-gradient-to-br from-indigo-50 to-blue-50 border-b border-indigo-100 pb-8 pt-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-3xl text-white shadow-lg shadow-indigo-500/20">
                    ❄️
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-indigo-950">AC Accommodation</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-8 bg-white">
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Room Types</h3>
                  <div className="flex flex-wrap justify-center gap-3 px-2">
                    {roomTypes.map((room, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        {room}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Available Packages</h3>
                <ul className="space-y-4 px-2">
                  {packages.map((pkg, index) => (
                    <li key={index} className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:bg-indigo-50/50 hover:border-indigo-200">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-700 group-hover:text-indigo-900 transition-colors">{pkg}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Notice & Contact */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-orange-100/50 bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/50 p-10 sm:p-16 text-center shadow-2xl shadow-orange-900/5">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
            
            <div className="relative z-10">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl mb-6 shadow-xl shadow-orange-200/50 ring-1 ring-orange-100">
                💬
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                Contact Us for Current Pricing
              </h2>
              <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Pricing may vary based on room availability, room type, and selected package. Reach out to us directly for the latest fee structures.
              </p>
              
              <div className="max-w-lg mx-auto bg-white/60 p-6 rounded-3xl backdrop-blur-sm border border-white/50 shadow-sm">
                <ContactButtons
                  primaryPhone={contact.primaryPhone}
                  secondaryPhone={contact.secondaryPhone}
                  whatsapp={contact.whatsapp}
                  whatsappMessage={whatsappMessage}
                  callVariant="primary"
                  whatsappVariant="whatsapp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
