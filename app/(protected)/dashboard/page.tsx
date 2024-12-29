'use client'

import { useAuth } from "@/contexts/auth-context"
import { Card, CardBody } from "@nextui-org/react";

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Card>
        <CardBody>
          <p>Welcome back, {user?.name}!</p>
        </CardBody>
      </Card>
    </div>
  )
} 