"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, CardBody, Chip } from "@nextui-org/react";
import { articleApi } from "@/services/articleApi";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export default function ArticleCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [article, setArticle] = React.useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    createdAt: new Date().toISOString(),
    tags: [] as string[],
  });

  const [newTag, setNewTag] = React.useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    setArticle((prev) => ({ ...prev, content: text }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await articleApi.createArticle(article);
      router.push("/articles/list");
      router.refresh();
    } catch (error) {
      console.error("Error creating article:", error);
      setError("Makale oluşturulurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!article.tags.includes(newTag.trim())) {
        setArticle((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()],
        }));
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Yeni Makale Oluştur</h1>

      <Form onSubmit={handleSubmit} className="w-full space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <Input
              label="Başlık"
              value={article.title}
              onChange={(e) =>
                setArticle((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />

            <Input
              label="Açıklama"
              value={article.description}
              onChange={(e) =>
                setArticle((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />

            <Input
              label="Resim URL"
              value={article.imageUrl}
              onChange={(e) =>
                setArticle((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              type="url"
              placeholder="https://example.com/image.jpg"
            />

            <div>
              <label className="block text-sm mb-2">İçerik</label>
              <MarkdownEditor
                value={article.content}
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </div>

            <div>
              <Input
                label="Etiket Ekle"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Enter'a basarak etiket ekleyin"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {article.tags.map((tag) => (
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

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                variant="light"
                onPress={() => router.push("/articles/list")}
              >
                İptal
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Oluştur
              </Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
}
