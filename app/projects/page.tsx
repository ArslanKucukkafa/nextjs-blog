"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Pagination,
  Chip,
  Link,
} from "@nextui-org/react";
import { projects } from "./types";

const ProjectList: React.FC = () => {
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
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {projects.map((project) => (
          <Card key={project.id} className="py-4 flex flex-col items-center">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
              <p className="text-xl text-blue-500 uppercase font-bold">
                {project.title}
              </p>
              <small className="text-default-500">
                {project.date.toLocaleDateString()}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
              <Image
                alt={project.title}
                className="object-cover rounded-xl"
                src={project.image}
                width={270}
              />
              <p className="mt-2 text-center">{project.description}</p>
              <div className="flex space-x-2 mt-2">
                {project.tags.map((tag, index) => (
                  <Chip key={index} color="primary">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center space-x-4">
              <Link showAnchorIcon href={project.githubUrl} color="success">
                GitHub&apos;a Git
              </Link>
              <Link href={`/projects/${project.id}`} color="warning">
                Markdown&apos;u Oku
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination showShadow color="primary" initialPage={1} total={10} />
      </div>
    </div>
  );
};

export default ProjectList;
