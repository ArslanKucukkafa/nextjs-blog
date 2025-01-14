"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useFullAuthStore } from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";

interface LogData {
  url?: string;
  exists?: boolean;
  error?: unknown;
  localStorage?: boolean;
  cookie?: boolean;
}

const logToStorage = (message: string, data?: LogData) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    message,
    data: data || null,
  };

  const logs = JSON.parse(localStorage.getItem("auth_logs") || "[]");
  logs.push(logEntry);
  localStorage.setItem("auth_logs", JSON.stringify(logs));
};

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useFullAuthStore();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      logToStorage("Error in callback", { error });
      toast.error("Authentication failed");
      router.push("/auth");
      return;
    }

    if (!token) {
      logToStorage("No token in callback");
      toast.error("No authentication token received");
      router.push("/auth");
      return;
    }

    try {
      setToken(token);
      logToStorage("Token set successfully", { exists: !!token });
      router.push("/dashboard");
    } catch (error) {
      logToStorage("Error setting token", { error });
      toast.error("Failed to process authentication");
      router.push("/auth");
    }
  }, [searchParams, router, setToken]);

  return <LoadingScreen />;
}
