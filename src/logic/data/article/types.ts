export type TArticle = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likers: string[];
  username: string;
  date: string;
  comments: {
    id: string;
    text: string;
    username?: string;
  }[];
};
