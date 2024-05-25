import { IArticle } from "../../../../../../model/components/Article/types";
import { getAsyncRefresh } from "../../../utils/utils";

export const generatePostsProps = (
  articles: IArticle[],
  refresh?: () => void,
) => {
  return (
    articles.map((article) => ({
      ...article.articleData,
      comments: [],
      tags: article.articleData.tags.map((tag) => ({
        id: tag,
        onClick: getAsyncRefresh(async () => {}, refresh),
      })),
      likeButtonProps: {
        onClick: getAsyncRefresh(
          async () => article.likeControl.onActivate?.bind(article)(),
          refresh,
        ),
        text: article.likeControl.text,
      },
      linkProps: {
        onClick: async () => {
          await article.read();
          refresh?.();
        },
      },
      userInfoProps: {
        date: article.articleData.date,
        username: article.articleData.username,
        onClick: getAsyncRefresh(
          async () => article.authorControl.onActivate?.(),
          refresh,
        ),
      },
      onClick: async () => {
        article.read();
        refresh?.();
      },
    })) ?? []
  );
};
