import { Button } from "@/components/ui/Button";
import { ContactButtons } from "@/components/contact/ContactButtons";
import type { ContactInfo } from "@/types";

interface HeroSectionProps {
  contact: ContactInfo;
}

export function HeroSection({ contact }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
            Student Friendly Environment
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Sri Siva Ganesh{" "}
            <span className="text-teal-200">Boys Hostel</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-teal-100 sm:text-xl">
            Multiple hostel buildings with daily transport to VIT-AP. Safe, affordable accommodation and comfortable living for students.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/buildings" variant="secondary" size="lg">
              Explore Buildings
            </Button>
            <ContactButtons
              phone={contact.phone}
              whatsapp={contact.whatsapp}
              layout="row"
              inverted
            />
          </div>
        </div>
      </div>
    </section>
  );
}
