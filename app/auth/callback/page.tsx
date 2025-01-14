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
        console.log("Current cookies:", document.cookie);

        // Cookie'den token'ı al
        const cookies = document.cookie.split(";");
        let accessToken = null;
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split("=");
          if (name === "access_token") {
            accessToken = decodeURIComponent(value);
            console.log("Found access token:", accessToken);
            break;
          }
        }

        if (!accessToken) {
          console.log("No access token found in cookies");
          toast.error("No authentication token found");
          router.replace("/auth");
          return;
        }

        // Token ile auth check yap
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
          {
            headers: {
              Authorization: accessToken,
            },
          },
        );

        console.log("Auth check status:", response.status);

        if (response.ok) {
          console.log("Auth check successful");
          setToken(accessToken); // Token'ı store'a kaydet
          toast.success("Successfully logged in");
          router.replace("/dashboard");
        } else {
          console.log("Auth check failed");
          setToken(null);
          toast.error("Authentication failed");
          router.replace("/auth");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setToken(null);
        toast.error("Authentication check failed");
        router.replace("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, setLoading, setToken]);

  return <LoadingScreen />;
}
