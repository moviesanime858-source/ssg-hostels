/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span>Admin<span className="text-teal-600">Panel</span></span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 focus:outline-none"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside
        className={cn(
          "w-full flex-col border-r border-slate-200 bg-white lg:flex lg:w-64 lg:min-h-screen",
          isOpen ? "flex" : "hidden"
        )}
      >
        {/* Desktop Header (hidden on mobile) */}
        <div className="hidden border-b border-slate-200 p-5 lg:block">
          <Link href="/admin" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span>Admin<span className="text-teal-600">Panel</span></span>
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
                onClick={() => setIsOpen(false)} // Close menu on click on mobile
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
    </>
  );
}
