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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          console.log("Auth check successful");
          toast.success("Successfully logged in");
          router.replace("/dashboard");
        } else {
          console.log("Auth check failed");
          toast.error("Authentication failed");
          router.replace("/auth");
        }
      } catch (error) {
        console.error("Auth check error:", error);
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
