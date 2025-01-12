"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Chip,
} from "@nextui-org/react";
import { perspectiveApi } from "@/services/perspectiveApi";

export default function CreatePerspectivePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [perspective, setPerspective] = React.useState({
    title: "",
    shortDescription: "",
    content: "",
    result: "",
    createdAt: new Date().toISOString(),
    isResult: false,
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await perspectiveApi.createPerspective({
        ...perspective,
        tags,
        isResult: false,
      });
      router.push("/perspectives/list");
      router.refresh();
    } catch (error) {
      console.error("Error creating perspective:", error);
      setError("Failed to create perspective");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Create New Perspective</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardBody className="space-y-4">
            <Input
              label="Title"
              value={perspective.title}
              onChange={(e) =>
                setPerspective({ ...perspective, title: e.target.value })
              }
              required
              placeholder="Enter perspective title"
            />

            <Input
              label="Short Description"
              value={perspective.shortDescription}
              onChange={(e) =>
                setPerspective({
                  ...perspective,
                  shortDescription: e.target.value,
                })
              }
              required
              placeholder="Enter short description"
            />

            <Textarea
              label="Content"
              value={perspective.content}
              onChange={(e) =>
                setPerspective({ ...perspective, content: e.target.value })
              }
              required
              minRows={4}
              placeholder="Enter detailed content"
            />

            <Textarea
              label="Result"
              value={perspective.result}
              onChange={(e) =>
                setPerspective({ ...perspective, result: e.target.value })
              }
              required
              minRows={2}
              placeholder="Enter perspective result"
            />

            <div>
              <Input
                label="Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add tag"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    onClose={() => handleRemoveTag(tag)}
                    variant="flat"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                variant="light"
                onPress={() => router.push("/perspectives/list")}
              >
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Create Perspective
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  );
}
