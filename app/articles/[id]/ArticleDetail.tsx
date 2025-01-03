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
  Image,
} from "@nextui-org/react";
import { articles } from "../types";

const ArticleDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return <p>Makale bulunamadı.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl text-blue-500 font-bold">{article.title}</h2>
          <p className="text-gray-500">{article.date.toLocaleDateString()}</p>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          <div className="flex justify-center">
            <Image
              alt={article.title}
              className="object-cover rounded-xl w-full max-h-[400px]"
              src={article.image}
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium mb-4">{article.description}</p>
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {article.tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="shadow">
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onPress={() => window.history.back()}>Geri Dön</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleDetail;
