"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useAbout } from "../../context/AboutContext";
import { Education } from "@/services/types";

export default function CreateEducationPage() {
  const { state, dispatch } = useAbout();
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [educationData, setEducationData] = useState<Education>({
    schoolName: "",
    schoolDegree: "",
    department: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    console.log("Current education:", state.about?.education);
  }, [state.about?.education]);

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEducation = [...(state.about?.education || [])];

    if (editingEducation) {
      const index = updatedEducation.findIndex(
        (edu) =>
          edu.schoolName === editingEducation.schoolName &&
          edu.startDate === editingEducation.startDate,
      );
      if (index !== -1) {
        updatedEducation[index] = educationData;
      }
    } else {
      updatedEducation.push(educationData);
    }

    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { education: updatedEducation },
    });

    // Formu temizle
    setEducationData({
      schoolName: "",
      schoolDegree: "",
      department: "",
      startDate: "",
      endDate: "",
    });
    setEditingEducation(null);
  };

  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
    setEducationData(education);
  };

  const handleDeleteEducation = (education: Education) => {
    const updatedEducation =
      state.about?.education.filter(
        (edu) =>
          !(
            edu.schoolName === education.schoolName &&
            edu.startDate === education.startDate
          ),
      ) || [];

    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { education: updatedEducation },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Mevcut Eğitimler */}
      {state.about?.education && state.about.education.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-xl font-bold">Mevcut Eğitimler</h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              {state.about.education.map((education) => (
                <Card
                  key={`${education.schoolName}-${education.startDate}`}
                  className="w-full hover:shadow-lg transition-shadow"
                >
                  <CardBody className="relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        color="primary"
                        size="sm"
                        variant="light"
                        onPress={() => handleEditEducation(education)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => handleDeleteEducation(education)}
                      >
                        Sil
                      </Button>
                    </div>
                    <h3 className="font-bold text-lg">
                      {education.schoolName}
                    </h3>
                    <p className="text-primary">{education.department}</p>
                    <p className="text-sm text-default-500">
                      {education.schoolDegree}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(education.startDate).toLocaleDateString(
                        "tr-TR",
                      )}{" "}
                      -{" "}
                      {new Date(education.endDate).toLocaleDateString("tr-TR")}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Eğitim Formu */}
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-bold">
            {editingEducation ? "Eğitimi Düzenle" : "Yeni Eğitim Ekle"}
          </h2>
        </CardHeader>
        <CardBody>
          <Form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleEducationSubmit}
          >
            <Input
              label="Okul Adı"
              name="schoolName"
              value={educationData.schoolName}
              onChange={handleEducationChange}
              required
            />
            <Input
              label="Derece"
              name="schoolDegree"
              value={educationData.schoolDegree}
              onChange={handleEducationChange}
              required
            />
            <Input
              label="Bölüm"
              name="department"
              value={educationData.department}
              onChange={handleEducationChange}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Başlangıç Tarihi"
                name="startDate"
                value={educationData.startDate}
                onChange={handleEducationChange}
                required
              />
              <Input
                type="date"
                label="Bitiş Tarihi"
                name="endDate"
                value={educationData.endDate}
                onChange={handleEducationChange}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              {editingEducation && (
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setEditingEducation(null);
                    setEducationData({
                      schoolName: "",
                      schoolDegree: "",
                      department: "",
                      startDate: "",
                      endDate: "",
                    });
                  }}
                >
                  İptal
                </Button>
              )}
              <Button color="primary" type="submit">
                {editingEducation ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
