import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { BuildingCard } from "@/components/buildings/BuildingCard";
import { Button } from "@/components/ui/Button";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { fetchBuildings, fetchContact } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [buildings, contact] = await Promise.all([
    fetchBuildings(),
    fetchContact(),
  ]);

  const featuredBuildings = buildings.slice(0, 3);

  return (
    <PublicLayout>
      <HeroSection contact={contact} />

      {/* Quick Access Banners */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 relative z-20 -mt-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Daily Transport</h3>
            <p className="text-sm text-slate-600 mb-4">Multiple daily trips between our hostels and VIT-AP campus.</p>
            <a href="/transport" className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Schedule <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Homely Food</h3>
            <p className="text-sm text-slate-600 mb-4">Fresh, nutritious meals prepared daily with special weekend menus.</p>
            <a href="/food" className="text-orange-600 text-sm font-semibold hover:text-orange-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Menu <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Flexible Payments</h3>
            <p className="text-sm text-slate-600 mb-4">Affordable monthly, half-yearly, and yearly packages for all budgets.</p>
            <a href="/fees" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Packages <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Hostel Overview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Experience premium living with world-class amenities designed specifically for student success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Multiple Buildings",
              desc: "Choose from our various well-maintained hostel buildings.",
              icon: "🏢",
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Daily Transport",
              desc: "Dedicated transport facility to and from VIT-AP campus daily.",
              icon: "🚌",
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              title: "Affordable Rent",
              desc: "Budget-friendly accommodation without compromising on quality.",
              icon: "💰",
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Safe & Comfortable",
              desc: "24/7 security with a comfortable, student-friendly environment.",
              icon: "🛡️",
              color: "bg-rose-50 text-rose-600",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl bg-slate-50 p-8 text-center transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Buildings */}
      {featuredBuildings.length > 0 && (
        <section className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured Hostels</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-xl">
                  Explore our most popular blocks, offering premium facilities and proximity to campus.
                </p>
              </div>
              <Button href="/buildings" variant="outline" size="lg" className="bg-white hover:bg-slate-50 hover:text-slate-900 rounded-full">
                View All Buildings
              </Button>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBuildings.map((building) => (
                <BuildingCard key={building.id} building={building} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900 px-8 py-16 shadow-2xl sm:px-16 sm:py-20 lg:flex lg:items-center lg:justify-between lg:gap-16">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          
          <div className="relative z-10 lg:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Move In?
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Join the SSG Hostels family today. Contact our management team to check current availability, pricing, and to schedule your visit.
            </p>
            <div className="mt-10">
              <ContactButtons
                primaryPhone={contact.primaryPhone}
                secondaryPhone={contact.secondaryPhone}
                whatsapp={contact.whatsapp}
                whatsappMessage={contact.inquiryMessageTemplate}
                layout="stack"
                callVariant="secondary"
                whatsappVariant="secondary"
              />
            </div>
          </div>
          
          <div className="relative z-10 mt-12 lg:mt-0 lg:w-1/2">
            <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-md">
              <h3 className="font-semibold text-white mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Location</p>
                    <p className="mt-1 text-white">Multiple locations near VIT-AP Campus, Amaravati.</p>
                  </div>
                </li>
                {contact.email && (
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-teal-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Email Us</p>
                      <a href={`mailto:${contact.email}`} className="mt-1 block text-white hover:text-teal-400 transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
