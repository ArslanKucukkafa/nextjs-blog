"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Chip,
} from "@nextui-org/react";
import { perspectives } from "./types";

const PerspectiveList: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Perspectives</h2>
          <Divider orientation="vertical" className="mx-4" />
          <p className="text-medium text-default-600">
            This page contains the topics I want to discuss and the ideas I want
            to share.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {perspectives.map((perspective) => (
          <Card
            key={perspective.id}
            className="py-4 flex flex-col items-center"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
              <p className="text-xl text-blue-500 uppercase font-bold">
                {perspective.title}
              </p>
              <small className="text-default-500">
                {perspective.date.toLocaleDateString()}
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
              <p className="mt-2 text-center">{perspective.shortDescription}</p>
              <div className="mt-2">
                <Chip
                  variant="flat"
                  color={perspective.isResult ? "success" : "danger"}
                >
                  {perspective.isResult ? "Sonuç: Mevcut" : "Sonuç: Henüz Yok"}
                </Chip>
              </div>
              <div className="flex space-x-2 mt-2">
                {perspective.tags.map((tag, index) => (
                  <Chip key={index} color="warning" variant="shadow">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
              <Link
                href={`/perspectives/${perspective.id}`}
                className="text-blue-500"
              >
                Devamını Oku
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerspectiveList;
