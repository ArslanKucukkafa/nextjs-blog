"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Chip,
  Button,
  Divider,
} from "@nextui-org/react";
import { MarkdownIcon } from "@/components/icons";
import { formatDate } from "@/utils/formatDate";
import { Article } from "./types";
import { articleApi } from "@/services/articleApi";
import { Filter } from "@/components/filter";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
  }>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 6,
    totalElements: 0,
  });

  const fetchArticles = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await articleApi.searchArticles({
          pageCount: page - 1,
          pageSize: pageInfo.pageSize,
          sortType: sortOrder === "newest" ? "DESC" : "ASC",
          tags: selectedTags,
          search: searchQuery,
          visible: true,
        });

        const formattedArticles = response.content.map((article) => ({
          ...article,
          date: new Date(article.createdAt),
          image: article.imageUrl || "",
        }));

        setArticles(formattedArticles);
        setPageInfo({
          currentPage: page,
          totalPages: response.totalPages,
          pageSize: response.size,
          totalElements: response.totalElements,
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching articles",
        );
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedTags, searchQuery, sortOrder, pageInfo.pageSize],
  );

  useEffect(() => {
    fetchArticles(1);
  }, [selectedTags, searchQuery, sortOrder, fetchArticles]);

  const handlePageChange = (page: number) => {
    fetchArticles(page);
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Articles</h2>
          <p className="mb-4">{error}</p>
          <Button
            color="danger"
            variant="solid"
            onClick={() => fetchArticles(1)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Articles Found</h2>
          <p className="mb-4">
            There are no articles matching your search or filter criteria.
          </p>
          <Button
            color="primary"
            variant="solid"
            onClick={() => {
              setSelectedTags([]);
              setSearchQuery("");
              setSortOrder("newest");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4">
      <div>
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Articles</h2>
          <Divider orientation="vertical" className="mx-4" />
          <p className="text-medium text-default-600">
            This page contains my writings about my experiences with various
            topics and technologies that I want to share with you.
          </p>
        </div>
        <div className="mt-4">
          <Filter
            selectedTags={selectedTags}
            searchQuery={searchQuery}
            sortOrder={sortOrder}
            onTagsChange={handleTagsChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            type="articles"
          />
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-xl font-bold text-warning">
                  {article.title}
                </p>
                <small className="text-default-500">
                  {formatDate(article.date)}
                </small>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
              <Image
                alt="Article image"
                className="object-cover rounded-xl mb-4"
                src={article.image}
                width={270}
              />
              <p className="text-sm text-default-500 mt-4">
                {article.description}
              </p>
              <div className="flex gap-1 flex-wrap mt-4 justify-center">
                {article.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="shadow" color="warning">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <CardFooter className="justify-center">
              <Button
                as={Link}
                href={`/articles/${article.id}`}
                color="primary"
                startContent={<MarkdownIcon />}
                variant="bordered"
                className="w-full"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          showControls
          color="warning"
          total={pageInfo.totalPages}
          initialPage={pageInfo.currentPage}
          page={pageInfo.currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ArticleList;
