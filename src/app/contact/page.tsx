import { PublicLayout } from "@/components/layout/PublicLayout";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { Card, CardContent } from "@/components/ui/Card";
import { fetchContact } from "@/lib/data";
import { getTelUrl, getWhatsAppUrl } from "@/lib/utils";

export const metadata = {
  title: "Contact",
  description: "Get in touch via phone, WhatsApp, or visit us on Google Maps.",
};

export default async function ContactPage() {
  const contact = await fetchContact();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 text-slate-600">
            Reach out for bookings, visits, or any questions about our hostels.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Hostel Inquiry</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Looking for comfortable and safe accommodation? Reach out to Sri Siva Ganesh Boys Hostel for room availability, fee details, and transport information.
                </p>
              </div>

              <ContactButtons
                phone={contact.phone}
                whatsapp={contact.whatsapp}
                layout="stack"
              />

              <div className="space-y-4 border-t border-slate-100 pt-6">
                <ContactItem
                  label="Phone"
                  value={contact.phone}
                  href={getTelUrl(contact.phone)}
                />
                <ContactItem
                  label="WhatsApp"
                  value={contact.whatsapp}
                  href={getWhatsAppUrl(contact.whatsapp)}
                />
                {contact.email && (
                  <ContactItem
                    label="Email"
                    value={contact.email}
                    href={`mailto:${contact.email}`}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      {href ? (
        <a href={href} className="mt-0.5 font-medium text-slate-900 hover:text-teal-700">
          {value}
        </a>
      ) : (
        <p className="mt-0.5 font-medium text-slate-900">{value}</p>
      )}
    </div>
  );
}
