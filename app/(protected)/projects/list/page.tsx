"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import { projectApi } from "@/services/projectApi";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { DeleteAlert } from "@/components/delete-alert";
import { formatDate } from "@/utils/formatDate";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  visible: boolean;
}

export default function ProjectListPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null,
  );
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProjects = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await projectApi.searchProjects({
        pageCount: 0,
        pageSize: 40,
        sortType: "ASC",
        visible: false,
      });

      const formattedProjects = response.content.map((project) => ({
        ...project,
        createdAt: project.createdAt || new Date().toISOString(),
        tags: project.tags || [],
        name: project.name || "",
        description: project.description || "",
        fullName: project.fullName || "",
        imageUrl: project.imageUrl || null,
        readmeUrl: project.readmeUrl || "",
        readme: project.readme || "",
        url: project.url || "",
        visible: Boolean(project.visible),
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEdit = (projectId: string) => {
    router.push(`/projects/list/${projectId}`);
  };

  const handleDelete = async (projectId: string) => {
    setSelectedProject(projects.find((p) => p.id === projectId) || null);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProject) return;

    try {
      setIsLoading(true);
      await projectApi.deleteProject(selectedProject.id);
      await fetchProjects(); // Refresh list after delete
      onClose();
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisibilityToggle = async (project: Project) => {
    try {
      setIsLoading(true);
      await projectApi.updateProjectVisibility(project.id, !project.visible);
      await fetchProjects(); // Refresh list after visibility update
    } catch (error) {
      console.error("Error updating project visibility:", error);
      setError("Failed to update project visibility");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setIsLoading(true);
      await projectApi.syncProjects();
      await fetchProjects(); // Refresh the list after sync
    } catch (error) {
      console.error("Error syncing projects:", error);
      setError("Failed to sync projects");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-2">
          <Button
            color="secondary"
            variant="flat"
            onPress={handleSync}
            isLoading={isLoading}
          >
            Sync Projects
          </Button>
        </div>
      </div>

      <Table aria-label="Projects table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
              <TableCell>
                <Chip
                  color={project.visible ? "success" : "warning"}
                  variant="flat"
                  size="sm"
                >
                  {project.visible ? "Visible" : "Hidden"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(project.id)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color={project.visible ? "warning" : "success"}
                    onPress={() => handleVisibilityToggle(project)}
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleDelete(project.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete ${selectedProject?.name}?`}
      />
    </div>
  );
}
