"use client";

import React, { useEffect, useState } from "react";
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
import { projects } from "../types";

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const project = projects.find((p) => p.id === Number(id));

  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      fetch(
        `https://raw.githubusercontent.com/ArslanKucukkafa/Enoca-Case/main/README.md`,
      ) // README dosyasının URL'sini ayarlayın
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
          throw new Error("README bulunamadı");
        })
        .then((data) => setReadmeContent(data))
        .catch((error) => console.error(error));
    }
  }, [project]);

  if (!project) {
    return <p>Proje bulunamadı.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl text-blue-500 font-bold">{project.title}</h2>
          <p className="text-gray-500">{project.date.toLocaleDateString()}</p>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          <div className="flex justify-center">
            <Image
              alt={project.title}
              className="object-cover rounded-xl w-full max-h-[400px]"
              src={project.image}
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium mb-4">{project.description}</p>
            <div className="prose prose-sm max-w-none text-gray-600">
              {readmeContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readmeContent}
                </ReactMarkdown>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {project.tags.map((tag, index) => (
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

export default ProjectDetail;
