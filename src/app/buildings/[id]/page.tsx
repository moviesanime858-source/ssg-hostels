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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {building.name}
          </h1>
          <VacancyBadge status={building.vacancyStatus} />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ImageGallery images={building.images} alt={building.name} />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {building.distanceFromUniversity} from university
                </div>



                <ContactButtons
                  phone={contact.phone}
                  whatsapp={contact.whatsapp}
                  whatsappMessage={whatsappMessage}
                  layout="stack"
                />
              </CardContent>
            </Card>

            <InquiryForm buildingId={building.id} buildingName={building.name} />
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900">About</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              {building.description}
            </p>
          </section>


          {building.facilities.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Facilities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {building.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-800"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </section>
          )}

          {building.googleMapsUrl && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Location</h2>
              <Card className="mt-4">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                      📍
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">
                        {building.distanceFromUniversity} from University
                      </p>
                      <p className="text-sm text-slate-600">
                        View exactly where this building is located.
                      </p>
                    </div>
                  </div>
                  <Button href={building.googleMapsUrl} variant="outline" external className="shrink-0">
                    View Directions
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
