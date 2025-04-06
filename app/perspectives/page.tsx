"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pagination,
  Chip,
  Button,
  Divider,
} from "@nextui-org/react";
import { MarkdownIcon } from "@/components/icons";
import { formatDate } from "@/utils/formatDate";
import { Perspective } from "./types";
import { perspectiveApi } from "@/services/perspectiveApi";
import { Filter } from "@/components/filter";

const PerspectiveList = () => {
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
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

  const fetchPerspectives = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await perspectiveApi.searchPerspectives({
          pageCount: page - 1,
          pageSize: pageInfo.pageSize,
          sortType: sortOrder === "newest" ? "DESC" : "ASC",
          tags: selectedTags,
          search: searchQuery,
          visible: true,
        });

        setPerspectives(response.content);
        setPageInfo({
          currentPage: page,
          totalPages: response.totalPages,
          pageSize: response.size,
          totalElements: response.totalElements,
        });
      } catch (error) {
        console.error("Error fetching perspectives:", error);
        setError("Failed to load perspectives");
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo.pageSize, sortOrder, selectedTags, searchQuery],
  );

  useEffect(() => {
    fetchPerspectives(1);
  }, [selectedTags, searchQuery, sortOrder, fetchPerspectives]);

  const handlePageChange = (page: number) => {
    fetchPerspectives(page);
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
        Loading perspectives...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Failed to Load Perspectives
          </h2>
          <p className="mb-4">{error}</p>
          <Button
            color="danger"
            variant="solid"
            onClick={() => fetchPerspectives(1)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (perspectives.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Perspectives Found</h2>
          <p className="mb-4">
            There are no perspectives matching your search or filter criteria.
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
          <h2 className="text-4xl font-bold">Perspectives</h2>
          <Divider orientation="vertical" className="mx-4" />
          <p className="text-medium text-default-600">
            This page contains my writings about my perspective and the topics I
            want to discuss.
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
            type="perspectives"
          />
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {perspectives.map((perspective) => (
          <Card key={perspective.id} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-warning">
                  {perspective.title}
                </p>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-sm text-default-500 mt-2">
                {perspective.shortDescription}
              </p>
              <div className="flex gap-2 flex-wrap mt-4">
                {perspective.tags.map((tag) => (
                  <Chip key={tag} size="md" variant="shadow" color="warning">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <CardFooter className="justify-between">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  {formatDate(perspective.createdAt)}
                </p>
              </div>
              <Button
                as={Link}
                href={`/perspectives/${perspective.id}`}
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

export default PerspectiveList;
