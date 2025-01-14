"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, CardBody, Chip } from "@nextui-org/react";
import { perspectiveApi } from "@/services/perspectiveApi";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export default function PerspectiveCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [perspective, setPerspective] = React.useState({
    title: "",
    description: "",
    shortDescription: "",
    content: "",
    imageUrl: "",
    createdAt: new Date().toISOString(),
    tags: [] as string[],
    isResult: false,
  });

  const [newTag, setNewTag] = React.useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    setPerspective((prev) => ({ ...prev, content: text }));
  };

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        window.location.href = "/perspectives/list";
      }, 1000);
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await perspectiveApi.createPerspective(perspective);

      if (response) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error creating perspective:", error);
      setError("Perspektif oluşturulurken bir hata oluştu");
      setIsLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!perspective.tags.includes(newTag.trim())) {
        setPerspective((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()],
        }));
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPerspective((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4">Perspektif başarıyla oluşturuldu</h2>
          <p>Listeye yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Yeni Perspektif Oluştur</h1>
      <Form onSubmit={handleSubmit} className="w-full space-y-6">
        <Card>
          <CardBody className="space-y-4">
            <Input
              label="Başlık"
              value={perspective.title}
              onChange={(e) =>
                setPerspective((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />

            <Input
              label="Açıklama"
              value={perspective.description}
              onChange={(e) =>
                setPerspective((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />

            <Input
              label="Kısa Açıklama"
              value={perspective.shortDescription}
              onChange={(e) =>
                setPerspective((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }))
              }
              required
            />

            <Input
              label="Resim URL"
              value={perspective.imageUrl}
              onChange={(e) =>
                setPerspective((prev) => ({
                  ...prev,
                  imageUrl: e.target.value,
                }))
              }
              type="url"
              placeholder="https://example.com/image.jpg"
            />

            <div>
              <label className="block text-sm mb-2">İçerik</label>
              <MarkdownEditor
                key="markdown-editor"
                value={perspective.content}
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </div>

            <div>
              <Input
                value={newTag}
                label="Etiket Ekle"
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Enter'a basarak etiket ekleyin"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {perspective.tags.map((tag) => (
                  <Chip
                    onClose={() => handleRemoveTag(tag)}
                    key={tag}
                    variant="flat"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Sonuç</label>
              <input
                type="checkbox"
                checked={perspective.isResult}
                onChange={(e) =>
                  setPerspective((prev) => ({
                    ...prev,
                    isResult: e.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                variant="light"
                onPress={() => router.push("/perspectives/list")}
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
