export interface Perspective {
  id: string;
  title: string;
  shortDescription: string;
  createdAt: string;
  tags: string[];
  content: string;
  isResult: boolean;
  result?: string;
}
