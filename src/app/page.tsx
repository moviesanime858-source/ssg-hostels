import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { BuildingCard } from "@/components/buildings/BuildingCard";
import { Button } from "@/components/ui/Button";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { fetchBuildings, fetchContact } from "@/lib/data";

export default async function HomePage() {
  const [buildings, contact] = await Promise.all([
    fetchBuildings(),
    fetchContact(),
  ]);

  const featuredBuildings = buildings.slice(0, 3);

  return (
    <PublicLayout>
      <HeroSection contact={contact} />

      {/* Transport Banner */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-indigo-50 border border-indigo-100 p-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-200 text-2xl text-indigo-700">
              🚌
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Daily Transport Available Between Hostel and VIT-AP</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Pickup from Hostel Mess
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Pickup from VIT-AP Main Gate
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Multiple trips throughout the day
                </li>
              </ul>
            </div>
          </div>
          <Button href="/transport" className="shrink-0">
            View Schedule
          </Button>
        </div>
      </section>

      {/* Food Banner */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-orange-50 border border-orange-100 p-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-200 text-2xl text-orange-700">
              🍲
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Nutritious and Homely Food Served Throughout the Week</h3>
              <p className="mt-1 text-sm text-slate-600">
                Fresh breakfast, daily veg curry, dal, and special non-veg items twice a week.
              </p>
            </div>
          </div>
          <Button href="/food" className="shrink-0">
            View Menu
          </Button>
        </div>
      </section>

      {/* Fees Banner */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-100 p-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4 mb-6 sm:mb-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-2xl text-emerald-700">
              💳
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Flexible Payment Packages Available</h3>
              <p className="mt-1 text-sm text-slate-600">
                Choose from Monthly, Half-Yearly, or Yearly packages for both AC and Non-AC accommodations.
              </p>
            </div>
          </div>
          <Button href="/fees" className="shrink-0">
            View Packages
          </Button>
        </div>
      </section>

      {/* Hostel Overview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Safe, affordable, and fully furnished student accommodation with
            everything you need to focus on your studies.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Multiple Buildings",
              desc: "Choose from our various well-maintained hostel buildings.",
              icon: "🏢",
            },
            {
              title: "Daily Transport",
              desc: "Dedicated transport facility to and from VIT-AP campus daily.",
              icon: "🚌",
            },
            {
              title: "Affordable Rent",
              desc: "Budget-friendly accommodation without compromising on quality.",
              icon: "💰",
            },
            {
              title: "Safe & Comfortable",
              desc: "24/7 security with a comfortable, student-friendly environment.",
              icon: "🛡️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Buildings */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Buildings</h2>
              <p className="mt-2 text-slate-600">
                Explore available hostel blocks and find your perfect room.
              </p>
            </div>
            <Button href="/buildings" variant="outline">
              View All Buildings
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBuildings.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-white sm:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to Move In?
            </h2>
            <p className="mt-3 text-teal-100">
              Contact us today to check availability, schedule a visit, or ask
              any questions about our hostel facilities.
            </p>
            <div className="mt-6">
              <ContactButtons
                phone={contact.phone}
                whatsapp={contact.whatsapp}
              />
            </div>
          </div>
          <div className="mt-8 border-t border-teal-500/30 pt-6 text-sm text-teal-100">
            <p>Multiple locations available near VIT-AP campus.</p>
            {contact.email && (
              <p className="mt-1">
                Email:{" "}
                <a href={`mailto:${contact.email}`} className="underline hover:text-white">
                  {contact.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
