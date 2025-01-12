"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Article } from "@/app/articles/types";
import { articleApi } from "@/services/articleApi";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

// SVG props için interface tanımı
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const EyeIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const DeleteIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export default function ArticleListPage() {
  const router = useRouter();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleApi.searchArticles({
          pageCount: 0,
          pageSize: 10,
          sortType: "ASC",
        });

        // API'den gelen veriyi Article tipine dönüştür
        const formattedArticles = response.content.map((article) => ({
          ...article,
          id: article.id,
          date: new Date(article.createdAt),
          image: article.imageUrl || "",
          title: article.title,
          description: article.description,
          content: article.content,
          tags: article.tags || [],
        }));

        setArticles(formattedArticles);
        setError(null);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded">
        <p>Failed to load articles:</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleDelete = useCallback(async (id: string) => {
    try {
      await articleApi.deleteArticle(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id),
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }, []);

  const renderCell = useCallback(
    (article: Article, columnKey: React.Key) => {
      const renderValue = (value: unknown): React.ReactNode => {
        if (typeof value === "object" && value instanceof Date) {
          return value.toLocaleDateString();
        }
        return String(value);
      };

      switch (columnKey) {
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{article.title}</p>
              {article.tags && article.tags.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {article.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          );
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm text-default-500">
                {article.description}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="View Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`/articles/list/${article.id}`)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Article">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(article.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return renderValue(article[columnKey as keyof Article]);
      }
    },
    [router, handleDelete],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Articles</h1>
        <button
          onClick={() => router.push("/articles/create")}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Create New Article
        </button>
      </div>

      <Table
        aria-label="Articles table"
        classNames={{
          wrapper: "max-h-[calc(100vh-300px)]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={articles}
          isLoading={loading}
          loadingContent={<div>Loading articles...</div>}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
