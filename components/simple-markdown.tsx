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
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "text-white" : "text-black"}>
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
                className={`${theme === "dark" ? "text-white" : "text-black"} px-1`}
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="my-4">
                <SyntaxHighlighter
                  style={theme === "dark" ? tomorrow : oneLight}
                  language={language}
                  PreTag="pre"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </pre>
            );
          },
          p: ({ children }) => <p className="my-2">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default SimpleMarkdown;
