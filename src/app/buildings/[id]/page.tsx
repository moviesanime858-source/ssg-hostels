import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ImageGallery } from "@/components/buildings/ImageGallery";
import { VacancyBadge } from "@/components/ui/VacancyBadge";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { InquiryForm } from "@/components/buildings/InquiryForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fetchBuilding, fetchContact } from "@/lib/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const building = await fetchBuilding(id);
  if (!building) return { title: "Building Not Found" };
  return {
    title: building.name,
    description: building.description,
  };
}

export default async function BuildingDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const [building, contact] = await Promise.all([
    fetchBuilding(id),
    fetchContact(),
  ]);

  if (!building) notFound();

  const whatsappMessage = `Hi, I'm interested in ${building.name}. Please share availability and booking details.`;

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {building.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <VacancyBadge status={building.vacancyStatus} />
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {building.distanceFromUniversity} from campus
              </div>
            </div>
          </div>
          <div className="hidden lg:block shrink-0">
            <Button href="#inquiry-form" size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-full px-8 shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-1">
              Book a Visit
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-white">
              <ImageGallery images={building.images} alt={building.name} />
            </div>

            <section className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">📝</span>
                About this Building
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {building.description}
              </p>
            </section>

            {building.facilities.length > 0 && (
              <section className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">✨</span>
                  Premium Facilities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {building.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {building.googleMapsUrl && (
              <section className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">📍</span>
                  Location & Directions
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900 text-lg">
                      {building.distanceFromUniversity} from Campus
                    </p>
                    <p className="mt-1 text-slate-600">
                      Open Google Maps to view exact location and directions.
                    </p>
                  </div>
                  <Button href={building.googleMapsUrl} external className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/20 px-6 py-3">
                    Open in Maps
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Sticky Action Area */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="sticky top-24 space-y-8">
              
              {/* Inquiry Action Box */}
              <div className="relative overflow-hidden rounded-[2rem] border border-orange-100/50 bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/50 p-8 shadow-xl shadow-orange-900/5">
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-orange-400/10 blur-2xl" />
                <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
                
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Interested in {building.name}?</h3>
                  <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                    Contact us directly to check current pricing, available packages, and to schedule a visit.
                  </p>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 backdrop-blur-sm">
                    <ContactButtons
                      primaryPhone={contact.primaryPhone}
                      secondaryPhone={contact.secondaryPhone}
                      whatsapp={contact.whatsapp}
                      whatsappMessage={whatsappMessage}
                      layout="stack"
                      callVariant="primary"
                      whatsappVariant="whatsapp"
                    />
                  </div>
                </div>
              </div>

              {/* Automated Inquiry Form */}
              <div id="inquiry-form" className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Send an Inquiry</h3>
                  <p className="mt-2 text-sm text-slate-500">Fill out this form and our team will get back to you shortly.</p>
                </div>
                <InquiryForm buildingId={building.id} buildingName={building.name} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
