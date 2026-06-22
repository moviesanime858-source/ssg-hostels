import Image from "next/image";
import type { Building } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { VacancyBadge } from "@/components/ui/VacancyBadge";
import { Button } from "@/components/ui/Button";

interface BuildingCardProps {
  building: Building;
}

export function BuildingCard({ building }: BuildingCardProps) {
  const imageUrl =
    building.images[0] ??
    "https://images.unsplash.com/photo-1555854877-0b037c5d5566?w=800&q=80";

  return (
    <Card hover className="overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={building.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute right-3 top-3">
          <VacancyBadge status={building.vacancyStatus} />
        </div>
      </div>

      <CardContent className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{building.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {building.distanceFromUniversity} from university
          </p>
        </div>



        <Button href={`/buildings/${building.id}`} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
