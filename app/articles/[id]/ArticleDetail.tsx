"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { articleApi } from "@/services/articleApi";
import { Article } from "../types";
import { MarkdownViewer } from "@/components/markdown-viewer";
import { formatDate } from "@/utils/formatDate";

const ArticleDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleApi.getArticle(id);
        const formattedArticle = {
          ...data,
          date: new Date(data.createdAt),
          image: data.imageUrl || "",
        };
        setArticle(formattedArticle);
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !article) {
    return <div>Error: {error || "Article not found"}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl text-blue-500 font-bold">{article.title}</h2>
          <p className="text-gray-500">{formatDate(article.date)}</p>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          {article.image && (
            <div className="flex justify-center">
              <Image
                alt={article.title}
                className="object-cover rounded-xl w-full max-h-[400px]"
                src={article.image}
              />
            </div>
          )}
          <Divider />

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              Short Description
            </h3>
            <p className="text-lg font-medium mb-4">{article.description}</p>
            <Divider />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Content
              </h3>
              <MarkdownViewer content={article.content} />
            </div>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex justify-center space-x-2">
              {article.tags.map((tag, index) => (
                <Chip key={index} color="warning" variant="shadow">
                  {tag}
                </Chip>
              ))}
            </div>
          )}
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

export default ArticleDetail;
