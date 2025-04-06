"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Pagination,
  Chip,
  Button,
} from "@nextui-org/react";
import { GithubIcon, MarkdownIcon } from "@/components/icons";
import { formatDate } from "@/utils/formatDate";
import { Project } from "./types";
import { projectApi } from "@/services/projectApi";
import { Filter } from "@/components/filter"; // Fixing Filter import

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 6,
  });

  const fetchProjects = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await projectApi.searchProjects({
          pageCount: page - 1,
          pageSize: pageInfo.pageSize,
          sortType: sortOrder === "newest" ? "DESC" : "ASC",
          tags: selectedTags,
          search: searchQuery,
          visible: true,
        });

        // API verisini Project tipine dönüştür
        const formattedProjects = response.content.map((project) => ({
          ...project,
          createdAt: project.createdAt || new Date().toISOString(),
          tags: project.tags || [],
          description: project.description || "",
        }));

        setProjects(formattedProjects);
        setPageInfo({
          currentPage: page,
          totalPages: response.totalPages,
          pageSize: response.size,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo.pageSize, sortOrder, selectedTags, searchQuery],
  );

  useEffect(() => {
    fetchProjects(1);
  }, [selectedTags, searchQuery, sortOrder, fetchProjects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply tag filtering
    if (selectedTags.length > 0) {
      result = result.filter((project) =>
        selectedTags.some((tag) => project.tags.includes(tag)),
      );
    }

    // Apply search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          (project.description?.toLowerCase() || "").includes(query),
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [projects, selectedTags, searchQuery, sortOrder]);

  const handlePageChange = (page: number) => {
    fetchProjects(page);
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
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Projects</h2>
          <p className="mb-4">{error}</p>
          <Button
            color="danger"
            variant="solid"
            onClick={() => fetchProjects(1)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-8 py-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
          <p className="mb-4">
            There are no projects matching your search or filter criteria.
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
    <div>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Projects</h2>
          <Divider orientation="vertical" className="mx-4" />
          <p className="text-medium text-default-600">
            This page contains my projects on github.
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
            type="projects"
          />
        </div>
      </div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="py-4 flex flex-col items-center">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
              <p className="text-xl text-warning uppercase font-bold">
                {project.name}
              </p>
              <small className="text-default-500">
                {formatDate(project.createdAt)}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
              <Image
                alt={project.name}
                className="object-cover rounded-xl"
                src={project.imageUrl || "https://via.placeholder.com/270x180"}
                width={270}
              />
              <p className="mt-2 text-center">
                {project.description || "No description available"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center max-w-[270px]">
                {project.tags.map((tag, index) => (
                  <Chip key={index} color="warning" variant="shadow" size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center space-x-4">
              <Button
                as="a"
                href={project.url}
                color="success"
                startContent={<GithubIcon />}
                variant="bordered"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
              {project.readmeUrl ? (
                <Button
                  as={Link}
                  href={`/projects/${project.id}`}
                  color="primary"
                  startContent={<MarkdownIcon />}
                  variant="bordered"
                  className="w-full"
                >
                  Read More
                </Button>
              ) : (
                <span className="text-red-500 cursor-not-allowed">
                  Readme not found
                </span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          showShadow
          color="warning"
          total={pageInfo.totalPages}
          initialPage={1}
          page={pageInfo.currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProjectList;
