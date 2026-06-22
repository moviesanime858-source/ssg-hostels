import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  const links = [
    {
      href: "/admin/buildings",
      title: "Buildings",
      desc: "Create, edit, and delete hostel buildings",
      icon: "🏢",
    },
    {
      href: "/admin/transport",
      title: "Transport",
      desc: "Manage auto timings, pickup points, and charges",
      icon: "🚌",
    },
    {
      href: "/admin/facilities",
      title: "Facilities",
      desc: "Update WiFi, laundry, food, and other amenities",
      icon: "✨",
    },
    {
      href: "/admin/contact",
      title: "Contact",
      desc: "Update phone, WhatsApp, and map links",
      icon: "📞",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-slate-600">
        Manage your SSG HOSTELS website content.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Card key={link.href} hover>
            <CardContent className="flex items-start gap-4">
              <span className="text-3xl">{link.icon}</span>
              <div className="flex-1">
                <h2 className="font-bold text-slate-900">{link.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{link.desc}</p>
                <Button href={link.href} variant="ghost" size="sm" className="mt-3 px-0">
                  Manage →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          ← View public website
        </Link>
      </div>
    </div>
  );
}
