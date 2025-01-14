"use client";
import { Button } from "@nextui-org/react";
import { GithubIcon } from "@/components/icons";
import { authApi } from "@/services/authApi";
import { useFullAuthStore } from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "sonner";

export default function LoginPage() {
  const { isLoading, setLoading } = useFullAuthStore();

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      const loginUrl = await authApi.githubLogin();
      console.log("GitHub OAuth URL:", loginUrl);

      if (!loginUrl) {
        throw new Error("Failed to generate GitHub login URL");
      }

      // Redirect to GitHub OAuth page
      window.location.href = loginUrl;
    } catch (error) {
      console.error("Error during GitHub login:", error);
      toast.error("Failed to start login process. Please try again.");
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center from-background to-default-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Login For Arslan</h1>
        <Button
          size="lg"
          color="default"
          variant="bordered"
          startContent={<GithubIcon className="text-xl" />}
          className="font-semibold"
          onPress={handleGithubLogin}
        >
          GitHub ile Giriş Yap
        </Button>
      </div>
    </div>
  );
}
