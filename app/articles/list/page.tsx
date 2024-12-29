'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Pagination, Chip } from '@nextui-org/react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'İlk Makale',
    description: 'Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. Bu, ilk makalenin kısa açıklamasıdır. ',
    date: '2023-10-01',
    image: 'https://picsum.photos/400/200',
  },
  {
    id: 2,
    title: 'İkinci Makale',
    description: 'Bu, ikinci makalenin kısa açıklamasıdır.',
    date: '2023-10-02',
    image: 'https://picsum.photos/400/200',
  },
  {
    id: 3,
    title: 'Üçüncü Makale',
    description: 'Bu, üçüncü makalenin kısa açıklamasıdır.',
    date: '2023-10-03',
    image: 'https://picsum.photos/400/200',
  },
  {
    id: 4,
    title: 'Dördüncü Makale',
    description: 'Bu, dördüncü makalenin kısa açıklamasıdır.',
    date: '2023-10-04',
    image: 'https://picsum.photos/400/200',
  },
  // Diğer makaleleri buraya ekleyebilirsiniz
];

const ArticleList: React.FC = () => {
  // Örnek etiketler
  const tags = [
    { label: 'Tag 1', color: 'primary' },
    { label: 'Tag 2', color: 'success' },
    { label: 'Tag 3', color: 'warning' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Articles</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {articles.map((article) => (
          <Card key={article.id} className="py-4 flex flex-col items-center">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
              <p className="text-xl text-blue-500 uppercase font-bold">{article.title}</p>
              <small className="text-default-500">{article.date}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
              <Image
                alt={article.title}
                className="object-cover rounded-xl"
                src={article.image}
                width={270}
              />
              <p className="mt-2 text-center">{article.description}</p>
              <div className="flex space-x-2 mt-2">
                {tags.map((tag, index) => (
                  <Chip key={index} color={tag.color}>{tag.label}</Chip>
                ))}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
              <Link href={`/articles/${article.id}`} className="text-blue-500">
                Devamını Oku
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination showShadow color="primary" initialPage={1} total={10} />
      </div>
    </div>
  );
};

export default ArticleList;
