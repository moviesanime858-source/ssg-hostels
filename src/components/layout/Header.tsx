"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import type { ContactInfo } from "@/types";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buildings", label: "Buildings" },
  { href: "/fees", label: "Fees" },
  { href: "/transport", label: "Transport" },
  { href: "/food", label: "Mess & Food" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
];

export function Header({ contact }: { contact: ContactInfo }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Extract the first word of hostel name as the highlight word
  const nameParts = contact.hostelName.split(" ");
  const firstWord = nameParts[0] || "SSG";
  const restWords = nameParts.slice(1).join(" ") || "HOSTELS";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white">
            {firstWord.charAt(0)}
          </span>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            {firstWord} <span className="text-teal-600">{restWords}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
