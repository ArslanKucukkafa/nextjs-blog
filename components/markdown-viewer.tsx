"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";

interface MarkdownViewerProps {
  content: string;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ComponentProps {
  children?: React.ReactNode;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  href?: string;
}

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const { theme } = useTheme();

  const MarkdownComponents: Partial<Components> = {
    // Handle code blocks
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      if (!inline) {
        return (
          <div className="my-4">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
              {...(props as SyntaxHighlighterProps)}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className={`px-1 py-0.5 rounded ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-800"
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Handle paragraphs
    p({ children }: ComponentProps) {
      return <div className="my-4 leading-relaxed">{children}</div>;
    },

    // Handle headings
    h1({ children }: ComponentProps) {
      return <h1 className="text-2xl font-bold my-4">{children}</h1>;
    },
    h2({ children }: ComponentProps) {
      return <h2 className="text-xl font-bold my-3">{children}</h2>;
    },
    h3({ children }: ComponentProps) {
      return <h3 className="text-lg font-bold my-2">{children}</h3>;
    },

    // Handle lists
    ul({ children }: ComponentProps) {
      return <ul className="list-disc list-inside my-4">{children}</ul>;
    },
    ol({ children }: ComponentProps) {
      return <ol className="list-decimal list-inside my-4">{children}</ol>;
    },
    li({ children }: ComponentProps) {
      return <li className="my-1">{children}</li>;
    },

    // Handle links
    a({ children, href, ...props }: LinkProps) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    },

    // Handle blockquotes
    blockquote({ children }: ComponentProps) {
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
          {children}
        </blockquote>
      );
    },

    // Handle horizontal rules
    hr() {
      return <hr className="my-4 border-t border-gray-300" />;
    },

    // Handle tables
    table({ children, ...props }: TableProps) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-300" {...props}>
            {children}
          </table>
        </div>
      );
    },
    thead({ children, ...props }: TheadProps) {
      return (
        <thead className="bg-gray-50" {...props}>
          {children}
        </thead>
      );
    },
    tbody({ children, ...props }: TheadProps) {
      return (
        <tbody className="divide-y divide-gray-200" {...props}>
          {children}
        </tbody>
      );
    },
    tr({ children, ...props }: TrProps) {
      return <tr {...props}>{children}</tr>;
    },
    th({ children, ...props }: TableCellProps) {
      return (
        <th
          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          {...props}
        >
          {children}
        </th>
      );
    },
    td({ children, ...props }: TableCellProps) {
      return (
        <td className="px-6 py-4 whitespace-nowrap" {...props}>
          {children}
        </td>
      );
    },
  };

  return (
    <div className={theme === "dark" ? "text-white" : "text-black"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
