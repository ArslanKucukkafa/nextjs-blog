export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  date: Date;
  image: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 1,
    title: "İlk Makale",
    description: "Bu, ilk makalenin kısa açıklamasıdır.",
    content: `
# İlk Makale İçeriği

Bu makale Markdown formatında yazılmıştır.

## Alt Başlık

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Sonuç

Makalenin sonuç bölümü burada yer alır.
    `,
    date: new Date("2023-10-01"),
    image: "https://picsum.photos/400/200",
    tags: ["Teknoloji", "Yazılım", "Web Geliştirme"],
  },
  // Diğer makaleler buraya eklenebilir
];
