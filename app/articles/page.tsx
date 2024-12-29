'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Articles</h1>
        <Button 
          as={Link} 
          href="/articles/create"
          color="primary"
        >
          Create New Article
        </Button>
      </div>
      {/* ... makale listesi ... */}
    </div>
  );
} 