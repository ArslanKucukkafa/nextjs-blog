import React from "react";
import ProjectDetailClient from "./ProjectDetailClient";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // Await the params
  const resolvedParams = await params;

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectDetailClient id={resolvedParams.id} />
      </Suspense>
    </div>
  );
}
