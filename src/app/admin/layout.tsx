"use client";

import { usePathname } from "next/navigation";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
