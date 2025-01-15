"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface SimpleMarkdownProps {
  content: string;
}

const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className={currentTheme === "dark" ? "text-white" : "text-gray-900"}>
      <ReactMarkdown
        components={{
          code: ({
            inline,
            className,
            children,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return inline ? (
              <code
                className={`${
                  currentTheme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                } px-1 rounded`}
                {...props}
              >
                {children}
              </code>
            ) : (
              <SyntaxHighlighter
                style={currentTheme === "dark" ? tomorrow : oneLight}
                language={language}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
          p: ({ children }) => (
            <p
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </p>
          ),
          h1: ({ children }) => (
            <h1
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li
              className={
                currentTheme === "dark" ? "text-white" : "text-gray-900"
              }
            >
              {children}
            </li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default SimpleMarkdown;
