import { uniqueId } from "lodash";
import { TPostProps } from "../../components/Post/types";
import { CurrentArticleId, PostsSubject } from "../common.logic";

export const getCurrentArticle = () => {
  const id = CurrentArticleId.getValue();
  if (!id) return undefined;
  const article = PostsSubject.getValue()[id];
  return article;
};

export const getArticlesByTagText = (text: string): TPostProps[] => {
  const articles = PostsSubject.getValue();

  return Object.values(articles).filter((article) => {
    const tag = article.tags.find(t => t.id === text)
    return !!tag;
  })
}

export const likeArticleById = (id: string) => {
  const article = getArticleById(id);

  if (!article) return;

  const increment = [article.hasLiked && -1, 1].find(
    (item) => typeof item === "number",
  ) as number;

  updateArticleById(id, {
    hasLiked: !article.hasLiked,
    likes: article.likes + increment,
  });
};

export const removeArticleById = (id: string): Record<string, TPostProps> => {
  const posts = PostsSubject.getValue();
  if (!posts[id]) return PostsSubject.getValue();

  delete posts[id];
  PostsSubject.next(posts);

  return PostsSubject.getValue();
};

export const getCurrentArticleId = () => {
  return CurrentArticleId.getValue();
};

export const getArticleById = (id: string): TPostProps | undefined => {
  const articles = PostsSubject.getValue();
  const article = articles[id];
  return article;
};

export const updateArticleById = (
  id: string,
  nextPost: Partial<TPostProps>,
) => {
  const articles = PostsSubject.getValue();
  const article = getArticleById(id);

  if (!article) {
    console.warn(`Article with id ${id} not found`);
  }

  articles[id] = {
    ...articles[id],
    ...nextPost,
  };

  PostsSubject.next(articles);
};

export const addCommentToArticle = (
  id: string,
  comment: string,
): TPostProps | undefined => {
  const article = getArticleById(id);

  if (!article) return;

  article.comments = [
    {
      id: uniqueId(),
      iconProps: {
        icon: "favorite",
      },
      inputProps: {
        id: uniqueId(),
        value: comment,
        placeholder: "",
      },
    },
    ...article.comments,
  ];

  updateArticleById(id, article);

  return article;
};
