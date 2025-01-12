"use client";
import { Button } from "@nextui-org/react";
import { GithubIcon } from "@/components/icons";
import { authApi } from "@/services/authApi";
import { useFullAuthStore } from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginPage() {
  const { isLoading, setLoading } = useFullAuthStore();

  const handleGithubLogin = () => {
    setLoading(true);
    window.location.href = authApi.githubLogin();
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
