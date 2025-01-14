"use client";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CallbackClient from "./CallbackClient";

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CallbackClient />
    </Suspense>
  );
}
