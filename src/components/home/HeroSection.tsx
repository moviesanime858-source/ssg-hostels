import { Button } from "@/components/ui/Button";
import { ContactButtons } from "@/components/contact/ContactButtons";
import type { ContactInfo } from "@/types";

interface HeroSectionProps {
  contact: ContactInfo;
}

export function HeroSection({ contact }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-0b037c5d5566?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl mix-blend-screen" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="inline-block rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-300 backdrop-blur-md uppercase">
              Premium Student Living Near VIT-AP
            </span>
          </div>
          
          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {contact.hostelName.split(" ")[0]} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              {contact.hostelName.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Experience comfortable, safe, and modern student accommodation.
            Fully equipped hostel buildings with daily university transport,
            high-speed WiFi, and excellent dining facilities.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button href="/buildings" size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white border-none shadow-lg shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-1">
              Explore Hostels
            </Button>
            <div className="hidden sm:block w-px h-10 bg-slate-700 mx-2" />
            <ContactButtons
              primaryPhone={contact.primaryPhone}
              secondaryPhone={contact.secondaryPhone}
              whatsapp={contact.whatsapp}
              whatsappMessage={contact.inquiryMessageTemplate}
              layout="row"
              callVariant="secondary"
              whatsappVariant="secondary"
            />
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8 sm:grid-cols-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {[
              { label: "Daily Transport", value: "VIT-AP" },
              { label: "High-Speed", value: "WiFi" },
              { label: "Healthy", value: "Meals" },
              { label: "24/7", value: "Security" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
