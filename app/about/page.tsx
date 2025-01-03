"use client";
import React from "react";

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
import { exampleAboutData } from "./types";

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDescription, setSelectedDescription] = React.useState("");
  const [selectedSkillDescription, setSelectedSkillDescription] =
    React.useState("");

  const aboutData = exampleAboutData;

  const handleOpenDrawer = (description: string) => {
    setSelectedDescription(description);
    onOpen();
  };

  const handleOpenSkillModal = (description: string) => {
    setSelectedSkillDescription(description);
    onOpen();
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8 gap-8">
      <h1 className={title()}>{aboutData.name}</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <Chip color="success" variant="bordered">
          <span className="font-semibold text-lg">Konum:</span>{" "}
          {aboutData.location}
        </Chip>
        <Chip color="warning" variant="bordered">
          <span className="font-semibold text-lg">Email:</span>{" "}
          {aboutData.email}
        </Chip>
        <Chip color="danger" variant="bordered">
          <span className="font-semibold text-lg">Durum:</span>{" "}
          {aboutData.status}
        </Chip>
      </div>

      <h2 className="text-lg font-semibold text-center">ABOUT SELF</h2>
      <Card>
        <CardBody>
          <p>{aboutData.aboutSelf}</p>
        </CardBody>
      </Card>

      <h2 className="text-lg font-semibold text-center">Goal</h2>
      <Card>
        <CardBody>
          <p>{aboutData.goal}</p>
        </CardBody>
      </Card>

      <h2 className="text-lg font-semibold text-center">Educations</h2>
      <div className="grid grid-cols-2 gap-4">
        {aboutData.education.map((edu, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3 text-blue-500">
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

      <h2 className="text-lg font-semibold text-center">Experiences</h2>
      <div className="grid grid-cols-2 gap-4">
        {aboutData.experiences.map((exp, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3 text-blue-500">
              <div className="flex flex-col">
                <p className="text-md">
                  {exp.companyName} - {exp.position}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                {exp.startDate} - {exp.endDate}
              </p>
              <Button
                variant="ghost"
                color="primary"
                className="mt-2"
                onPress={() => handleOpenDrawer(exp.description)}
              >
                Show Description
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-center">Skills</h2>
      <div className="grid grid-cols-3 gap-4">
        {aboutData.skills.map((skill, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex gap-3 text-blue-500">
              <div className="flex flex-col">
                <p className="text-md">{skill.skillName}</p>
                <p className="text-sm">{skill.skillLevel}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Button
                variant="ghost"
                color="primary"
                className="mt-2"
                onPress={() => handleOpenSkillModal(skill.skillDescription)}
              >
                Scope of talent
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deneyim Açıklaması
              </ModalHeader>
              <ModalBody>
                <p>{selectedDescription}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Kapat
                </Button>
                <Button color="primary" onPress={onClose}>
                  Tamam
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Skill Açıklaması
              </ModalHeader>
              <ModalBody>
                <p>{selectedSkillDescription}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Kapat
                </Button>
                <Button color="primary" onPress={onClose}>
                  Tamam
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
