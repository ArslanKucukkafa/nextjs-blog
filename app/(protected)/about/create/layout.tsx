"use client";
import React, { useEffect } from "react";
import { AboutProvider } from "../context/AboutContext";
import { Card, CardBody, Button, Spinner } from "@nextui-org/react";
import { useAbout } from "../context/AboutContext";
import { useRouter, usePathname } from "next/navigation";

interface Step {
  number: number;
  title: string;
  path: string;
}

const steps: Step[] = [
  { number: 1, title: "Kişisel Bilgiler", path: "/about/create" },
  { number: 2, title: "Yetenekler", path: "/about/create/skills" },
  { number: 3, title: "Deneyimler", path: "/about/create/experiences" },
  { number: 4, title: "Eğitim", path: "/about/create/educations" },
];

interface LayoutProps {
  children: React.ReactNode;
}

function StepIndicator(): JSX.Element {
  const { state } = useAbout();

  return (
    <div className="flex justify-between w-full mb-8">
      {steps.map((step: Step) => (
        <div
          key={step.number}
          className={`flex flex-col items-center ${
            state.currentStep === step.number
              ? "text-primary"
              : state.currentStep > step.number
                ? "text-success"
                : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              state.currentStep === step.number
                ? "bg-primary text-white"
                : state.currentStep > step.number
                  ? "bg-success text-white"
                  : "bg-gray-200"
            }`}
          >
            {step.number}
          </div>
          <span className="text-sm">{step.title}</span>
        </div>
      ))}
    </div>
  );
}

function NavigationButtons(): JSX.Element {
  const { state, dispatch, saveAbout } = useAbout();
  const router = useRouter();

  const handleNext = async () => {
    const nextStep = state.currentStep + 1;
    if (nextStep <= steps.length) {
      dispatch({ type: "NEXT_STEP" });
      await router.push(steps[nextStep - 1].path);
    }
  };

  const handlePrev = async () => {
    const prevStep = state.currentStep - 1;
    if (prevStep >= 1) {
      dispatch({ type: "PREV_STEP" });
      await router.push(steps[prevStep - 1].path);
    }
  };

  const handleSave = async () => {
    try {
      await saveAbout();
      await router.push("/about");
    } catch (error) {
      console.error("Error saving about:", error);
    }
  };

  if (state.loading) {
    return (
      <div className="flex justify-center mt-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-8">
      {state.currentStep > 1 && (
        <Button color="default" onPress={handlePrev}>
          Geri
        </Button>
      )}
      <div className="flex gap-2">
        {state.currentStep < 4 ? (
          <Button color="primary" onPress={handleNext}>
            İleri
          </Button>
        ) : (
          <Button
            color="success"
            onPress={handleSave}
            isLoading={state.loading}
          >
            Kaydet
          </Button>
        )}
      </div>
    </div>
  );
}

function Layout({ children }: LayoutProps): JSX.Element {
  const { state, dispatch } = useAbout();
  const pathname = usePathname();

  useEffect(() => {
    const currentStep = steps.find((step) => step.path === pathname);
    if (currentStep) {
      dispatch({ type: "SET_STEP", payload: currentStep.number });
    }
  }, [pathname, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="w-full">
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold mb-6">
            {state.about?.id
              ? "About Bilgilerini Güncelle"
              : "About Bilgilerini Oluştur"}
          </h2>
          {state.error && (
            <div className="bg-danger-50 text-danger p-4 rounded-lg mb-6">
              {state.error}
            </div>
          )}
          <StepIndicator />
          {state.loading ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            children
          )}
          <NavigationButtons />
        </CardBody>
      </Card>
    </div>
  );
}

function LayoutWrapper({ children }: LayoutProps): JSX.Element {
  return (
    <AboutProvider>
      <Layout>{children}</Layout>
    </AboutProvider>
  );
}

export default LayoutWrapper;
