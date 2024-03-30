export type TArticle = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  hasLiked: boolean;
  username: string;
  date: string;
  comments: {
    id: string;
    text: string;
    username?: string;
  }[];
};
