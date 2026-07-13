import { PublicLayout } from "@/components/layout/PublicLayout";
import { BuildingCard } from "@/components/buildings/BuildingCard";
import { fetchBuildings, fetchContact } from "@/lib/data";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { Card, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Buildings",
  description: "Browse all hostel buildings with rent, vacancy, and location details.",
};

export default async function BuildingsPage() {
  const [buildings, contact] = await Promise.all([
    fetchBuildings(),
    fetchContact()
  ]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Buildings</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            {buildings.length > 0 
              ? `${buildings.length} premium building${buildings.length !== 1 ? "s" : ""} designed for ultimate student comfort.`
              : "Discover our premium accommodation options. Please contact management for current availability."}
          </p>
        </div>

        {buildings.length === 0 ? (
          <div className="space-y-16 animate-fade-in-up">
            {/* Empty State Action Box */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-100/50 bg-gradient-to-br from-teal-50 via-emerald-50/30 to-teal-100/50 p-10 sm:p-16 text-center shadow-2xl shadow-teal-900/5">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              
              <div className="relative z-10">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl mb-6 shadow-xl shadow-teal-200/50 ring-1 ring-teal-100">
                  🏢
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                  No Buildings Listed Yet
                </h2>
                <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  We are currently updating our building portfolio. Please reach out to our management team directly to inquire about premium rooms and availability.
                </p>
                
                <div className="max-w-lg mx-auto bg-white/60 p-6 rounded-3xl backdrop-blur-sm border border-white/50 shadow-sm">
                  <ContactButtons
                    primaryPhone={contact.primaryPhone}
                    secondaryPhone={contact.secondaryPhone}
                    whatsapp={contact.whatsapp}
                    whatsappMessage="Hi, I would like to inquire about room availability and building details."
                    callVariant="primary"
                    whatsappVariant="whatsapp"
                  />
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="opacity-50 pointer-events-none select-none grayscale-[0.5]">
              <div className="flex items-center gap-2 mb-8 justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full ring-1 ring-slate-200">
                  Building Card Preview
                </span>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-dashed border-2 border-slate-300 shadow-none rounded-3xl">
                  <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center border-b border-slate-200">
                    <span className="text-slate-400 font-medium tracking-wide">(Image Placeholder Area)</span>
                  </div>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-700 tracking-tight">(Building Name Placeholder)</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        (Building Address Placeholder)
                      </p>
                    </div>
                    <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      (Building Description Placeholder)
                    </div>
                    <div className="flex gap-2 pt-2">
                      <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-lg">(Facilities)</span>
                      <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-lg">(Status)</span>
                    </div>
                    <div className="w-full mt-4 py-3 bg-slate-100 text-slate-400 rounded-xl font-semibold text-center text-sm border border-slate-200">
                      View Details (Disabled)
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {buildings.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
