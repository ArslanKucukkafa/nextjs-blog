"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Form, Input, Button } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import MarkdownIt from "markdown-it";

const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const ArticleCreate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [action, setAction] = useState<string | null>(null);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
    setPreviewContent(mdParser.render(text)); // Markdown içeriğini render et
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0]; // Tarih formatı YYYY-MM-DD
    const articleData = {
      title,
      description,
      content,
      date,
      image,
      tags,
    };

    console.log("Makale Verisi:", articleData);
    setAction(`submit ${JSON.stringify(articleData)}`);
    // Burada makale verisini sunucuya gönderebilirsiniz
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const clearTags = () => {
    setTags([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Yeni Makale Oluştur</h1>
      <Form
        className="w-full max-w-lg flex flex-col gap-6"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          label="Başlık"
          labelPlacement="outside"
          name="title"
          placeholder="Başlığı girin"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />

        <Input
          isRequired
          label="Açıklama"
          labelPlacement="outside"
          name="description"
          placeholder="Açıklamayı girin"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-lg"
        />

        <div>
          <label className="block text-lg">İçerik:</label>
          <MarkdownEditor
            value={content}
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="text-lg"
        />

        <div>
          <label className="block text-lg">Etiketler:</label>
          <div className="flex gap-2 mb-2">
            {tags.map((tag, index) => (
              <Chip key={index} onClick={() => removeTag(tag)}>
                {tag}
              </Chip>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              label="Yeni Etiket"
              placeholder="Etiket ekleyin"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTag();
                }
              }}
            />
            <Button color="primary" onClick={addTag}>
              Ekle
            </Button>
            <Button color="danger" onClick={clearTags}>
              Clear
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button color="primary" type="submit" className="w-full text-sm">
            Makale Oluştur
          </Button>
          <Button
            type="reset"
            variant="flat"
            onClick={() => setAction(null)}
            className="w-full text-sm"
          >
            Reset
          </Button>
        </div>

        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>

      <h2 className="text-2xl mt-6">Önizleme:</h2>
      <div className="border p-4 w-full max-w-lg">
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{description}</p>
        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        <h4 className="font-bold mt-4">Etiketler:</h4>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Chip key={index}>{tag}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCreate;
