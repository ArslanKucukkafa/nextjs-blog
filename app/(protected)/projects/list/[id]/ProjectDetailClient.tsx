"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Input,
  Button,
  Textarea,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { projectApi } from "@/services/projectApi";
import { MarkdownViewer } from "@/components/markdown-viewer";

interface Project {
  id: string;
  createdAt: string;
  tags: string[];
  name: string;
  description: string;
  fullName: string;
  imageUrl: string | null;
  readmeUrl: string;
  readme: string;
  url: string;
  visible: boolean;
}

interface ProjectDetailClientProps {
  id: string;
}

export default function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const router = useRouter();
  const [project, setProject] = React.useState<Project | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isNavigating, setIsNavigating] = React.useState(false);

  const fetchProject = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await projectApi.getProject(id);

      // API'den gelen veriyi Project tipine uygun hale getir
      const formattedProject: Project = {
        id: data.id,
        createdAt: data.createdAt || new Date().toISOString(),
        tags: data.tags || [],
        name: data.name || "",
        description: data.description || "",
        fullName: data.fullName || "",
        imageUrl: data.imageUrl || null,
        readmeUrl: data.readmeUrl || "",
        readme: data.readme || "",
        url: data.url || "",
        visible: Boolean(data.visible),
      };

      setProject(formattedProject);
      setTags(formattedProject.tags);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleEditToggle = () => {
    if (isEditing) {
      fetchProject();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof Project, value: string | boolean) => {
    setProject((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || isNavigating) return;

    setIsSaving(true);
    setError(null);

    try {
      const updatedProject: Project = {
        ...project,
        imageUrl: project.imageUrl ?? null,
        readmeUrl: project.readmeUrl ?? "",
        readme: project.readme ?? "",
        tags: tags,
      };

      const response = await projectApi.updateProject(updatedProject);

      const formattedResponse: Project = {
        id: response.id,
        createdAt: response.createdAt || new Date().toISOString(),
        tags: response.tags || [],
        name: response.name || "",
        description: response.description || "",
        fullName: response.fullName || "",
        imageUrl: response.imageUrl || null,
        readmeUrl: response.readmeUrl || "",
        readme: response.readme || "",
        url: response.url || "",
        visible: Boolean(response.visible),
      };

      setIsNavigating(true);
      setProject(formattedResponse);
      setIsEditing(false);

      router.refresh();
      router.push("/projects/list");
    } catch (error) {
      console.error("Error updating project:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      setIsNavigating(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !project) {
    return <div>Error: {error || "Project not found"}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project Details</h1>
        {!isNavigating && (
          <Button
            color={isEditing ? "danger" : "primary"}
            onPress={handleEditToggle}
            isDisabled={isSaving}
          >
            {isEditing ? "Cancel Edit" : "Edit Project"}
          </Button>
        )}
      </div>

      {isEditing && !isNavigating ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <Input
                key="name"
                label="Name"
                value={project.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                isRequired
                isDisabled={isSaving}
              />
              <Input
                key="fullName"
                label="Full Name"
                value={project.fullName || ""}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                isRequired
                isDisabled={isSaving}
              />
              <Textarea
                key="description"
                label="Description"
                value={project.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                isRequired
                isDisabled={isSaving}
              />
              <Input
                key="imageUrl"
                label="Image URL"
                value={project.imageUrl || ""}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                isDisabled={isSaving}
              />
              <Input
                key="url"
                label="Project URL"
                value={project.url || ""}
                onChange={(e) => handleInputChange("url", e.target.value)}
                isRequired
                isDisabled={isSaving}
              />
              <Input
                key="readmeUrl"
                label="README URL"
                value={project.readmeUrl || ""}
                onChange={(e) => handleInputChange("readmeUrl", e.target.value)}
                isDisabled={isSaving}
              />
              <Textarea
                key="readme"
                label="README Content"
                value={project.readme || ""}
                onChange={(e) => handleInputChange("readme", e.target.value)}
                minRows={10}
                isDisabled={isSaving}
              />
              <div className="space-y-2">
                <Input
                  label="Add Tag"
                  placeholder="Press Enter to add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  isDisabled={isSaving}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      onClose={() => handleRemoveTag(tag)}
                      variant="flat"
                      isDisabled={isSaving}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
              <Select
                label="Visibility"
                selectedKeys={[project.visible ? "true" : "false"]}
                onChange={(e) =>
                  handleInputChange("visible", e.target.value === "true")
                }
                isDisabled={isSaving}
              >
                <SelectItem key="true" value="true">
                  Visible
                </SelectItem>
                <SelectItem key="false" value="false">
                  Hidden
                </SelectItem>
              </Select>
            </CardBody>
          </Card>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              color="danger"
              variant="light"
              onPress={handleEditToggle}
              isDisabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isSaving}
              isDisabled={isNavigating}
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <Card>
          <CardBody className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {project.name}
                </p>
                <p>
                  <strong>Full Name:</strong> {project.fullName}
                </p>
                <p>
                  <strong>Description:</strong> {project.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {project.visible ? "Visible" : "Hidden"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Links</h2>
              <div className="space-y-2">
                {project.url && (
                  <p>
                    <strong>Project URL:</strong>{" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {project.url}
                    </a>
                  </p>
                )}
                {project.readmeUrl && (
                  <p>
                    <strong>README URL:</strong>{" "}
                    <a
                      href={project.readmeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {project.readmeUrl}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            {project.readme && (
              <div>
                <h2 className="text-xl font-semibold mb-4">README</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <MarkdownViewer content={project.readme} />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
