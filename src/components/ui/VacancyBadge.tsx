import { VACANCY_COLORS, VACANCY_LABELS, type VacancyStatus } from "@/types";
import { cn } from "@/lib/utils";

interface VacancyBadgeProps {
  status: VacancyStatus;
  className?: string;
}

export function VacancyBadge({ status, className }: VacancyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        VACANCY_COLORS[status],
        className
      )}
    >
      {VACANCY_LABELS[status]}
    </span>
  );
}
