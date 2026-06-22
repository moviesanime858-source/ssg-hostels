import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">Page Not Found</h2>
      <p className="mt-2 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
