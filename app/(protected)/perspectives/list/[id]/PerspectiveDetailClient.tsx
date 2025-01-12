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
import { Perspective } from "@/app/perspectives/types";

interface PerspectiveDetailClientProps {
  id: string;
}

export default function PerspectiveDetailClient({
  id,
}: PerspectiveDetailClientProps) {
  const router = useRouter();
  const [perspective, setPerspective] = React.useState<Perspective | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");

  const fetchPerspective = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await perspectiveApi.getPerspective(id);
      setPerspective(data);
      setTags(data.tags || []);
    } catch (error) {
      console.error("Error fetching perspective:", error);
      setError("Failed to load perspective");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchPerspective();
  }, [fetchPerspective]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!perspective) return;

    try {
      setIsLoading(true);
      const updatedPerspective = {
        ...perspective,
        tags,
      };
      await perspectiveApi.updatePerspective(updatedPerspective);
      router.push("/perspectives/list");
      router.refresh();
    } catch (error) {
      console.error("Error updating perspective:", error);
      setError("Failed to update perspective");
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!perspective) return <div>No perspective found</div>;

  return (
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
          />

          <Textarea
            label="Content"
            value={perspective.content}
            onChange={(e) =>
              setPerspective({ ...perspective, content: e.target.value })
            }
            required
            minRows={4}
          />

          <Textarea
            label="Result"
            value={perspective.result}
            onChange={(e) =>
              setPerspective({ ...perspective, result: e.target.value })
            }
            required
            minRows={2}
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
              Save Changes
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
