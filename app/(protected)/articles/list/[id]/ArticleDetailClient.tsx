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
import { articleApi } from "@/services/articleApi";
import { Article } from "@/app/articles/types";

interface ArticleDetailClientProps {
  id: string;
}

export default function ArticleDetailClient({ id }: ArticleDetailClientProps) {
  const router = useRouter();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");

  const fetchArticle = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await articleApi.getArticle(id);
      const formattedArticle: Article = {
        ...data,
        id: data.id,
        date: new Date(data.createdAt),
        image: data.imageUrl || "",
      };
      setArticle(formattedArticle);
      setTags(data.tags || []);
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Failed to load article");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    try {
      setIsLoading(true);
      const updatedArticle = {
        ...article,
        id: String(article.id),
        createdAt: article.date.toISOString(),
        imageUrl: article.image,
        tags,
      };
      await articleApi.updateArticle(updatedArticle);
      router.push("/articles/list");
      router.refresh();
    } catch (error) {
      console.error("Error updating article:", error);
      setError("Failed to update article");
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
  if (!article) return <div>No article found</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardBody className="space-y-4">
          <Input
            label="Title"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            required
          />

          <Input
            label="Description"
            value={article.description}
            onChange={(e) =>
              setArticle({ ...article, description: e.target.value })
            }
            required
          />

          <Textarea
            label="Content"
            value={article.content}
            onChange={(e) =>
              setArticle({ ...article, content: e.target.value })
            }
            required
            minRows={4}
          />

          <Input
            label="Image URL"
            value={article.image}
            onChange={(e) => setArticle({ ...article, image: e.target.value })}
            required
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
              onPress={() => router.push("/articles/list")}
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
