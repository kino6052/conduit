import { TArticleProps } from "../../../details/ui/view/components/Article/types";
import { AppState } from "../app";
import { UserDatabase } from "../user";
import { TUserInfo } from "../user/types";
import { IArticleData } from "./types";

export const processArticle = (
  article: IArticleData,
): TArticleProps | undefined => {
  const user = UserDatabase.findUserByName(article.username);

  if (!user) return undefined;

  return {
    id: article.id,
    comments: article.comments
      .filter((c) => {
        if (!c.username) return false;
        return !!UserDatabase.findUserByName(c.username);
      })
      .map((c) => {
        const user = UserDatabase.findUserByName(
          c.username as string,
        ) as TUserInfo;

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
          userInfoProps: user.username
            ? {
                username: user.username,
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
    userInfoProps: {
      username: user.username,
      date: article.date,
    },
  };
};
