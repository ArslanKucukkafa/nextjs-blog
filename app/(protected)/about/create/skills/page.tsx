"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Slider,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useAbout } from "../../context/AboutContext";
import { Skill } from "@/services/types";

export default function SkillsPage() {
  const { state, dispatch } = useAbout();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    skillName: "",
    skillLevel: 50,
    skillDescription: "",
  });

  const handleAddOrUpdateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.skillName && newSkill.skillDescription) {
      const updatedSkills = [...(state.about?.skills || [])];

      if (editingSkill) {
        // Güncelleme
        const index = updatedSkills.findIndex(
          (s) =>
            s.skillName === editingSkill.skillName &&
            s.skillDescription === editingSkill.skillDescription,
        );
        if (index !== -1) {
          updatedSkills[index] = { ...newSkill };
        }
      } else {
        // Yeni eklemeden önce aynı isimde skill var mı kontrol et
        const existingSkill = updatedSkills.find(
          (s) => s.skillName === newSkill.skillName,
        );
        if (existingSkill) {
          alert("Bu isimde bir yetenek zaten mevcut!");
          return;
        }
        updatedSkills.push({ ...newSkill });
      }

      dispatch({
        type: "UPDATE_ABOUT_FIELD",
        payload: { skills: updatedSkills },
      });

      // Formu temizle
      setNewSkill({
        skillName: "",
        skillLevel: 50,
        skillDescription: "",
      });
      setEditingSkill(null);
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setNewSkill({
      skillName: skill.skillName,
      skillLevel: skill.skillLevel,
      skillDescription: skill.skillDescription,
    });
  };

  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills =
      state.about?.skills.filter((s) => s.skillName !== skillName) || [];

    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { skills: updatedSkills },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardBody>
          <form
            onSubmit={handleAddOrUpdateSkill}
            className="flex flex-col gap-4"
          >
            <Input
              label="Yetenek Adı"
              placeholder="Örn: JavaScript"
              value={newSkill.skillName}
              onChange={(e) =>
                setNewSkill({ ...newSkill, skillName: e.target.value })
              }
              required
            />
            <Input
              label="Açıklama"
              placeholder="Yetenek açıklaması"
              value={newSkill.skillDescription}
              onChange={(e) =>
                setNewSkill({ ...newSkill, skillDescription: e.target.value })
              }
              required
            />
            <div className="flex flex-col gap-2">
              <label>Seviye: {newSkill.skillLevel}</label>
              <Slider
                aria-label="Yetenek Seviyesi"
                size="sm"
                step={1}
                maxValue={5}
                minValue={1}
                value={newSkill.skillLevel}
                onChange={(value) =>
                  setNewSkill({ ...newSkill, skillLevel: Number(value) })
                }
                className="max-w-md"
              />
            </div>
            <Button type="submit" color="primary">
              {editingSkill ? "Yeteneği Güncelle" : "Yetenek Ekle"}
            </Button>
            {editingSkill && (
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setEditingSkill(null);
                  setNewSkill({
                    skillName: "",
                    skillLevel: 50,
                    skillDescription: "",
                  });
                }}
              >
                İptal
              </Button>
            )}
          </form>
        </CardBody>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Yetenekler</h3>
        {state.about?.skills && state.about.skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.about.skills.map((skill, index) => (
              <Card
                key={`${skill.skillName}-${index}`}
                className="hover:shadow-lg transition-shadow"
              >
                <CardBody>
                  <h4 className="font-medium">{skill.skillName}</h4>
                  <p className="text-sm text-gray-600">
                    {skill.skillDescription}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Seviye:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className={`w-4 h-4 rounded-full ${
                              index < skill.skillLevel
                                ? "bg-primary"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="gap-2 justify-end">
                  <Button
                    size="sm"
                    color="primary"
                    variant="light"
                    onPress={() => handleEditSkill(skill)}
                  >
                    Düzenle
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={() => handleRemoveSkill(skill.skillName)}
                  >
                    Sil
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardBody>
              <p className="text-gray-500">Henüz yetenek eklenmedi.</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
