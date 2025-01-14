"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFullAuthStore } from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";

export default function CallbackPage() {
  const router = useRouter();
  const { setToken, setLoading } = useFullAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Starting auth check...");

        // Document cookie'lerini kontrol et
        console.log("Document cookies:", document.cookie);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
          {
            credentials: "include",
          },
        );

        // Response headers'ı detaylı logla
        console.log("\nResponse Headers:");
        response.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        // Cookie spesifik kontrol
        const setCookieHeader = response.headers.get("set-cookie");
        console.log("\nSet-Cookie header:", setCookieHeader);

        // CORS headers kontrol
        console.log("\nCORS Headers:");
        console.log(
          "Allow-Credentials:",
          response.headers.get("access-control-allow-credentials"),
        );
        console.log(
          "Allow-Origin:",
          response.headers.get("access-control-allow-origin"),
        );
        console.log("Response status:", response.status);

        const responseData = await response.text();
        console.log("\nResponse body:", responseData);

        if (response.ok) {
          console.log("Auth check successful");
          toast.success("Successfully logged in");
          // router.replace("/dashboard"); // Yönlendirmeyi kaldırdık
        } else {
          console.log("Auth check failed");
          toast.error("Authentication failed");
          // router.replace("/auth"); // Yönlendirmeyi kaldırdık
        }
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication check failed");
        // router.replace("/auth"); // Yönlendirmeyi kaldırdık
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, setLoading, setToken]);

  return (
    <div>
      <LoadingScreen />
      <div className="fixed top-4 right-4 p-4 bg-black/50 text-white rounded">
        Check browser console for logs
      </div>
    </div>
  );
}
