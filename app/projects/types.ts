export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  date: Date;
  image: string;
  githubUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "İlk Proje",
    description: "Bu, ilk projenin kısa açıklamasıdır.",
    content: `
# İlk Proje İçeriği

Bu proje Markdown formatında yazılmıştır.

## Proje Detayları

Proje hakkında daha fazla bilgi burada yer alır.
    `,
    date: new Date("2023-10-01"),
    image: "https://picsum.photos/400/200",
    githubUrl: "https://github.com/ilk-proje",
    tags: ["React", "Next.js", "Web Geliştirme"],
  },
  // Diğer projeler buraya eklenebilir
];
