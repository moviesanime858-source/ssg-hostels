import { Header } from "./Header";
import { Footer } from "./Footer";
import { fetchContact } from "@/lib/data";

export async function PublicLayout({ children }: { children: React.ReactNode }) {
  const contact = await fetchContact();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header contact={contact} />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} />
    </div>
  );
}
