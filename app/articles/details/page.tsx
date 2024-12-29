'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, Chip, CardHeader, CardBody } from '@nextui-org/react';

interface ArticleProps {
  title: string;
  image: string;
  date: string;
  tags: { label: string; color: 'primary' | 'success' | 'warning' | 'danger' | 'default' }[];
  content: string;
}

const ArticleDetails: React.FC<ArticleProps> = ({
  title,
  image,
  date,
  tags = [],
  content,
}) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-4xl font-bold">{title}</h1>
        <small className="text-gray-500">{date}</small>
      </CardHeader>
      <CardBody>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="flex space-x-2 mt-2">
          {tags.map((tag, index) => (
            <Chip key={index} color={tag.color}>{tag.label}</Chip>
          ))}
        </div>
        <div className="mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </CardBody>
    </Card>
  );
};

export default ArticleDetails;
