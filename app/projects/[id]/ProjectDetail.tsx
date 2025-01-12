"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
  Chip,
} from "@nextui-org/react";
import { projectApi } from "@/services/projectApi";
import { Project } from "../types";
import { MarkdownViewer } from "@/components/markdown-viewer";
import { formatDate } from "@/utils/formatDate";

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const [project, setProject] = React.useState<Project | null>(null);
  const [readmeContent, setReadmeContent] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProject = async () => {
      if (!params.id) return;

      try {
        const data = await projectApi.getProject(params.id as string);
        setProject({
          ...data,
          createdAt: data.createdAt || new Date().toISOString(),
          tags: data.tags || [],
        });

        if (data.readme) {
          setReadmeContent(data.readme);
        }
      } catch (err) {
        setError("Failed to load project");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !project) {
    return <div>Error: {error || "Project not found"}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <div className="flex flex-col md:flex-row items-start gap-4 p-4">
          <CardHeader className="flex-1">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-blue-500">
                {project.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>
              <div className="text-medium text-default-500">
                {formatDate(project.createdAt)}
              </div>
            </div>
          </CardHeader>
        </div>

        <Divider />

        <CardBody className="space-y-6">
          <div className="relative flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Description
              </h2>
              <div className="text-default-700">
                {project.description || "No description available"}
              </div>
            </div>
            <Divider />

            {project.url && (
              <div>
                <span className="text-xl font-semibold mb-2 text-blue-500">
                  Project URL:{" "}
                </span>
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-default-500"
                >
                  {project.url}
                </Link>
              </div>
            )}
            <Divider />

            {readmeContent && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-500">
                  README
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <MarkdownViewer content={readmeContent} />
                </div>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            as="a"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            color="success"
          >
            View on GitHub
          </Button>
          <Button onPress={() => window.history.back()} color="primary">
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectDetail;
