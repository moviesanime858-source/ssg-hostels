import Link from "next/link";
import { getTelUrl, getWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const phone = "9949552648";

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
                S
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-wide">SSG HOSTELS</span>
                <span className="text-xs text-teal-400">Sri Siva Ganesh Boys Hostel</span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Safe, comfortable, and affordable student accommodation near VIT-AP campus with daily transport facilities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/buildings" className="hover:text-teal-400 transition-colors">Buildings</Link></li>
              <li><Link href="/fees" className="hover:text-teal-400 transition-colors">Fees</Link></li>
              <li><Link href="/transport" className="hover:text-teal-400 transition-colors">Transport</Link></li>
              <li><Link href="/food" className="hover:text-teal-400 transition-colors">Mess & Food</Link></li>
              <li><Link href="/facilities" className="hover:text-teal-400 transition-colors">Facilities</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact Us</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Have questions? Reach out to us directly.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={getTelUrl(phone)}
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                📞 +91 {phone}
              </a>
              <a
                href={getWhatsAppUrl(phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Sri Siva Ganesh Boys Hostel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
