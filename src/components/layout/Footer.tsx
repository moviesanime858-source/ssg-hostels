import Link from "next/link";
import { getTelUrl, getWhatsAppUrl } from "@/lib/utils";
import type { ContactInfo } from "@/types";

export function Footer({ contact }: { contact: ContactInfo }) {
  const phone = contact.primaryPhone;
  const whatsappMsg = contact.inquiryMessageTemplate;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
                {contact.hostelName.charAt(0)}
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-wide">{contact.hostelName}</span>
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
                📞 {phone}
              </a>
              <a
                href={getWhatsAppUrl(contact.whatsapp, whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-slate-400 font-medium italic">
              &quot;Thank you Vamsi anna for your support.&quot;
            </p>
            <p className="text-sm text-slate-400 font-medium italic">
              &quot;Thank you Mani aunty for your care and giving us a Homely feel.&quot;
            </p>
          </div>
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} Sri Siva Ganesh Boys Hostel. All rights reserved.
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-2">
              <span>Developed by:</span>
              <a href="https://wa.me/919949552648" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Lokeshwar</a>
              <span className="text-slate-700">•</span>
              <a href="https://wa.me/919561287172" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Pavan</a>
              <span className="text-slate-700">•</span>
              <a href="https://wa.me/919618484381" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Nithin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
