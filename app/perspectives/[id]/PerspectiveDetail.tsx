"use client";

import React from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Button,
} from "@nextui-org/react";
import { perspectives } from "../types";

const PerspectiveDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const perspective = perspectives.find((p) => p.id === Number(id));

  if (!perspective) {
    return <p>Perspektif bulunamadı.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl text-blue-500 font-bold">
            {perspective.title}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Chip
              variant="flat"
              color={perspective.isResult ? "success" : "danger"}
              className="text-sm"
            >
              Sonuç: {perspective.isResult ? "Mevcut" : "Henüz Yok"}
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-medium mb-4">
              {perspective.shortDescription}
            </p>
            <div className="prose prose-sm max-w-none text-gray-600 mx-auto prose-table:mx-auto prose-p:text-center prose-headings:text-center">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {perspective.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {perspective.tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="shadow">
                {tag}
              </Chip>
            ))}
          </div>

          <p className="text-gray-500 text-center">
            {perspective.date.toLocaleDateString()}
          </p>

          {perspective.isResult && perspective.result && (
            <div className="mt-8 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">
                📊 Sonuç Değerlendirmesi
              </h3>
              <p className="text-gray-600 italic">{perspective.result}</p>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onPress={() => window.history.back()}>Geri Dön</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PerspectiveDetail;
