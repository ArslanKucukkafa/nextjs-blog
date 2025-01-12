export interface Project {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  imageUrl: string | null;
  url: string;
  readmeUrl: string | null;
  tags: string[];
  createdAt: string;
  visible: boolean;
}

export const projects: Project[] = [];
