import { TArticleProps } from "../../../components/Article/types";
import { AppState } from "../app";
import { UserDatabase } from "../user";
import { TArticle } from "./types";

export const processArticle = (article: TArticle): TArticleProps => {
  const user = UserDatabase.findUserByName(article.username);

  return {
    id: article.id,
    comments: article.comments.map((c) => {
      const user = c.username
        ? UserDatabase.findUserByName(c.username)
        : undefined;
      return {
        id: c.id,
        inputProps: {
          id: c.id,
          value: c.text,
          placeholder: "",
        },
        iconProps: {
          icon: user?.imageSrc ?? "favorite",
        },
        userInfoProps: user?.username
          ? {
              username: user?.username,
              date: article.date,
            }
          : undefined,
      };
    }),
    description: article.description,
    hasLiked:
      !!AppState.currentUserId &&
      article.likers.includes(AppState.currentUserId),
    likes: article.likers.length,
    tags: article.tags.map((t) => ({
      id: t,
    })),
    title: article.title,
    userInfoProps: user?.username
      ? {
          username: user?.username,
          date: article.date,
        }
      : undefined,
  };
};
