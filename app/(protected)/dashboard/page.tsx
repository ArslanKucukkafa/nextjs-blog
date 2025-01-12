"use client";

import { Card, CardBody } from "@nextui-org/react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-lg">
        <CardBody className="text-center">
          <h1 className="text-4xl font-bold mb-4">Merhaba Arslan 👋</h1>
          <p className="text-lg text-default-600">
            Dashboard sayfasına hoş geldiniz!
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
