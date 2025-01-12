"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import { useAbout } from "../../context/AboutContext";
import { Experience } from "@/services/types";

export default function CreateExperiencePage() {
  const { state, dispatch } = useAbout();
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [experienceData, setExperienceData] = useState<Experience>({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    console.log("Current experiences:", state.about?.experinces);
  }, [state.about?.experinces]);

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExperienceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExperiences = [...(state.about?.experinces || [])];

    if (editingExperience) {
      const index = updatedExperiences.findIndex(
        (exp) =>
          exp.companyName === editingExperience.companyName &&
          exp.startDate === editingExperience.startDate,
      );
      if (index !== -1) {
        updatedExperiences[index] = experienceData;
      }
    } else {
      updatedExperiences.push(experienceData);
    }

    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { experinces: updatedExperiences },
    });

    // Formu temizle
    setExperienceData({
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditingExperience(null);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setExperienceData(experience);
  };

  const handleDeleteExperience = (experience: Experience) => {
    const updatedExperiences =
      state.about?.experinces.filter(
        (exp) =>
          !(
            exp.companyName === experience.companyName &&
            exp.startDate === experience.startDate
          ),
      ) || [];

    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { experinces: updatedExperiences },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Debug için */}
      {!state.about?.experinces && <p>No experiences data</p>}
      {state.about?.experinces?.length === 0 && (
        <p>Experiences array is empty</p>
      )}

      {/* Mevcut Deneyimler */}
      {state.about?.experinces && state.about.experinces.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-xl font-bold">Mevcut Deneyimler</h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              {state.about.experinces.map((experience) => (
                <Card
                  key={`${experience.companyName}-${experience.startDate}`}
                  className="w-full hover:shadow-lg transition-shadow"
                >
                  <CardBody className="relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        color="primary"
                        size="sm"
                        variant="light"
                        onPress={() => handleEditExperience(experience)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => handleDeleteExperience(experience)}
                      >
                        Sil
                      </Button>
                    </div>
                    <h3 className="font-bold text-lg">{experience.position}</h3>
                    <p className="text-primary">{experience.companyName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(experience.startDate).toLocaleDateString(
                        "tr-TR",
                      )}{" "}
                      -{" "}
                      {new Date(experience.endDate).toLocaleDateString("tr-TR")}
                    </p>
                    <p className="mt-2">{experience.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Deneyim Formu */}
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-bold">
            {editingExperience ? "Deneyimi Düzenle" : "Yeni Deneyim Ekle"}
          </h2>
        </CardHeader>
        <CardBody>
          <Form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleExperienceSubmit}
          >
            <Input
              label="Şirket Adı"
              name="companyName"
              value={experienceData.companyName}
              onChange={handleExperienceChange}
              required
            />
            <Input
              label="Pozisyon"
              name="position"
              value={experienceData.position}
              onChange={handleExperienceChange}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Başlangıç Tarihi"
                name="startDate"
                value={experienceData.startDate}
                onChange={handleExperienceChange}
                required
              />
              <Input
                type="date"
                label="Bitiş Tarihi"
                name="endDate"
                value={experienceData.endDate}
                onChange={handleExperienceChange}
                required
              />
            </div>
            <Textarea
              label="Açıklama"
              name="description"
              value={experienceData.description}
              onChange={handleExperienceChange}
              required
              minRows={4}
            />
            <div className="flex gap-2 justify-end">
              {editingExperience && (
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setEditingExperience(null);
                    setExperienceData({
                      companyName: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }}
                >
                  İptal
                </Button>
              )}
              <Button color="primary" type="submit">
                {editingExperience ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
