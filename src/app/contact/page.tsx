import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { fetchContact } from "@/lib/data";
import { getTelUrl } from "@/lib/utils";

export const metadata = {
  title: "Contact",
  description: "Get in touch via phone, WhatsApp, or visit us on Google Maps.",
};

export default async function ContactPage() {
  const contact = await fetchContact();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            We&apos;re here to help! Reach out for bookings, to schedule a visit, or if you have any questions about our hostel facilities.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8 items-start">
          
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-100/50 bg-gradient-to-br from-teal-50 via-emerald-50/30 to-teal-100/50 p-8 sm:p-10 shadow-xl shadow-teal-900/5">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Direct Inquiry</h2>
                <p className="mt-2 text-slate-600">
                  Looking for comfortable and safe accommodation near VIT-AP? Reach out directly.
                </p>

                <div className="mt-8">
                  <ContactButtons
                    primaryPhone={contact.primaryPhone}
                    secondaryPhone={contact.secondaryPhone}
                    whatsapp={contact.whatsapp}
                    whatsappMessage={contact.inquiryMessageTemplate}
                    layout="stack"
                    callVariant="primary"
                    whatsappVariant="whatsapp"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 sm:p-10 shadow-lg shadow-slate-200/50">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Other Ways to Connect</h3>
              <div className="space-y-6">
                <ContactItem
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  label="Primary Phone"
                  value={contact.primaryPhone}
                  href={getTelUrl(contact.primaryPhone)}
                />
                {contact.secondaryPhone && (
                  <ContactItem
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                    label="Secondary Phone"
                    value={contact.secondaryPhone}
                    href={getTelUrl(contact.secondaryPhone)}
                  />
                )}
                {contact.email && (
                  <ContactItem
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    label="Email Address"
                    value={contact.email}
                    href={`mailto:${contact.email}`}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden h-full">
              <div className="p-8 sm:p-10 border-b border-slate-100 bg-slate-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Visit Us</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      We have multiple buildings conveniently located near the VIT-AP Campus in Amaravati.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-video sm:aspect-[21/9] lg:aspect-[4/3] bg-slate-200 w-full overflow-hidden">
                {/* Embedded Google Map Placeholder - In a real app this would be an iframe */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl mb-4 shadow-xl">
                    🗺️
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">Location Map</h4>
                  <p className="text-slate-200 mt-2 max-w-sm">Please contact management for exact building locations and directions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        {href ? (
          <a href={href} className="mt-1 block font-semibold text-slate-900 hover:text-teal-600 transition-colors">
            {value}
          </a>
        ) : (
          <p className="mt-1 font-semibold text-slate-900">{value}</p>
        )}
      </div>
    </div>
  );
}
