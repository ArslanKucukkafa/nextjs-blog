import React from "react";
import PerspectiveDetailClient from "./PerspectiveDetailClient";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PerspectiveDetailClient id={resolvedParams.id} />
      </Suspense>
    </div>
  );
}
