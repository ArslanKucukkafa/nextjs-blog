"use client";
import { useFullAuthStore } from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";
import AdminNavbar from "@/components/AdminNavbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useFullAuthStore();

  // Auth check yapılıyor, middleware zaten yönlendirmeyi yapacak
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
