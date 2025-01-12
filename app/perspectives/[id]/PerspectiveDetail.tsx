"use client";

import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Button,
} from "@nextui-org/react";
import { getPerspectiveById } from "@/services/perspectiveApi";
import { Perspective } from "@/app/perspectives/types";
import { MarkdownViewer } from "@/components/markdown-viewer";

const PerspectiveDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [perspective, setPerspective] = useState<Perspective | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerspective = async () => {
      try {
        const data = await getPerspectiveById(id);
        setPerspective(data);
      } catch (err) {
        setError("Failed to load perspective");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerspective();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !perspective) {
    return <div>Error: {error || "Perspective not found"}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl text-blue-500 font-bold">
            {perspective.title}
          </h2>
          <p className="text-gray-500">{formatDate(perspective.createdAt)}</p>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              Short Description
            </h3>
            <p className="text-lg font-medium mb-4">
              {perspective.shortDescription}
            </p>
            <Divider />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Content
              </h3>
              <MarkdownViewer content={perspective.content} />
            </div>
          </div>
          <Divider />
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">Result</h3>
            <p>{perspective.result}</p>
          </div>
          <Divider />
          <div className="flex justify-center space-x-2">
            {perspective.tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="shadow">
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onPress={() => window.history.back()} color="primary">
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PerspectiveDetail;
