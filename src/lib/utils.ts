export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getWhatsAppUrl(number: string, message?: string): string {
  const cleaned = number.replace(/\D/g, "");
  const base = `https://wa.me/${cleaned}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function getTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function getDefaultContact() {
  return {
    primaryPhone: process.env.NEXT_PUBLIC_DEFAULT_PHONE ?? "+919949552648",
    secondaryPhone: "",
    whatsapp: process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP ?? "+919949552648",
    email: "",
    hostelName: "SSG HOSTELS",
    inquiryMessageTemplate: "Hi, I would like to inquire about room availability.",
  };
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
