"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import experinces_image from "@/public/office-building.png";
import skills_image from "@/public/pencil.png";
import educations_image from "@/public/education.png";

import { title } from "@/components/primitives";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  useDisclosure,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { aboutApi, About } from "@/services/aboutApi";
import SimpleMarkdown from "@/components/simple-markdown";

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDescription, setSelectedDescription] = useState("");
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await aboutApi.getAbout();
        console.log("About data received:", data);
        // Transform the skills data to match our component's expected structure
        const transformedData = {
          ...data,
          skills: data.skills.map((skill) => ({
            skillName: skill.skillName,
            skillLevel: skill.skillLevel,
            skillDescription: skill.skillDescription,
          })),
        };
        console.log("Transformed skills data:", transformedData.skills);
        setAboutData(transformedData);
      } catch (err) {
        setError("Failed to load about data");
        console.error("Error fetching about data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleOpenModal = (description: string) => {
    setSelectedDescription(description);
    onOpen();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !aboutData) {
    return <div>Error: {error || "Failed to load data"}</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8 gap-8">
      <h1 className={title()}>{aboutData.name}</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <Chip color="success" variant="bordered" className="text-lg">
          <span className="font-semibold text-lg">Konum:</span>{" "}
          {aboutData.location}
        </Chip>
        <Chip color="warning" variant="bordered" className="text-lg">
          <span className="font-semibold">Email:</span> {aboutData.email}
        </Chip>
        <Chip color="danger" variant="bordered" className="text-lg">
          <span className="font-semibold">Durum:</span> {aboutData.status}
        </Chip>
        <Chip color="primary" variant="bordered" className="text-lg">
          <span className="font-semibold">Current Company:</span>{" "}
          {aboutData.currentCompany}
        </Chip>
        <Chip color="secondary" variant="bordered" className="text-lg">
          <span className="font-semibold">Job Area:</span> {aboutData.jobTitle}
        </Chip>
      </div>

      <section className="w-full space-y-4">
        <h2 className="text-lg font-semibold text-center">ABOUT SELF</h2>
        <SimpleMarkdown content={aboutData.aboutSelf} />
      </section>

      <section className="w-full space-y-4">
        <h2 className="text-lg font-semibold text-center">Goal</h2>
        <SimpleMarkdown content={aboutData.goal} />
      </section>

      <h2 className="text-lg font-semibold text-center">Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {aboutData.education.map((edu, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3 text-blue-500">
              <Image
                alt="nextui logo"
                height={40}
                src={educations_image.src}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">
                  {edu.schoolName} - {edu.schoolDegree}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{edu.department}</p>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-center">Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {aboutData.experinces.map((exp, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                src={experinces_image.src}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md text-blue-500">{exp.companyName}</p>
                <p className="text-small text-default-500">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="font-semibold">{exp.position}</p>
              <Button
                color="primary"
                variant="bordered"
                onPress={() => handleOpenModal(exp.description)}
              >
                Scope Of Experience
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {aboutData.skills.map((skill, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                src={skills_image.src}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-xl text-blue-500">{skill.skillName}</p>
                <div className="flex items-center gap-2">
                  <span className="text-medium text-default-500">Level:</span>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index < skill.skillLevel
                            ? "bg-primary"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Button
                color="primary"
                variant="bordered"
                onPress={() => handleOpenModal(skill.skillDescription)}
              >
                Scope Of Talent
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
              <ModalBody>
                <p>{selectedDescription}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
