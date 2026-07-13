import Image from "next/image";
import type { Building } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { VacancyBadge } from "@/components/ui/VacancyBadge";
import { fixGoogleDriveUrl } from "@/lib/utils";

interface BuildingCardProps {
  building: Building;
}

export function BuildingCard({ building }: BuildingCardProps) {
  const imageUrl =
    building.images[0]
      ? fixGoogleDriveUrl(building.images[0])
      : "https://images.unsplash.com/photo-1555854877-0b037c5d5566?w=800&q=80";

  return (
    <Card className="group overflow-hidden rounded-[2rem] border-0 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-slate-200" />
        <Image
          src={imageUrl}
          alt={building.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        
        <div className="absolute right-4 top-4 z-10">
          <VacancyBadge status={building.vacancyStatus} />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="text-2xl font-bold tracking-tight">{building.name}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-200">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {building.distanceFromUniversity} from university
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {building.facilities.slice(0, 3).map(f => (
            <span key={f} className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
              {f}
            </span>
          ))}
          {building.facilities.length > 3 && (
            <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
              +{building.facilities.length - 3} more
            </span>
          )}
        </div>

        <a
          href={`/buildings/${building.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          View Details
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
}
