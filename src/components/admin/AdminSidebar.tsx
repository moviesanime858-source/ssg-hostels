"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const adminLinks = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/buildings", label: "Buildings" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/facilities", label: "Facilities" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/contact", label: "Contact" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-white lg:w-64 lg:min-h-screen">
      <div className="border-b border-slate-200 p-5">
        <Link href="/admin" className="text-lg font-bold text-slate-900">
          Admin<span className="text-teal-600">Panel</span>
        </Link>
        <p className="mt-1 text-xs text-slate-500">Sri Siva Ganesh CMS</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {adminLinks.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-200 p-4">
        <Button href="/" variant="ghost" size="sm" className="w-full justify-start">
          View Site
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
