import { IArticle } from "../../../../../app/entities/components/Article/types";
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
        onClick: async () => {},
      })),
      likeButtonProps: {
        onClick: getAsyncRefresh(
          async () => article.likeControl.onActivate?.bind(article)(),
          refresh,
        ),
        text: article.likeControl.text,
      },
      linkProps: {
        onClick: getAsyncRefresh(article.read.bind(article), refresh),
      },
      userInfoProps: {
        date: article.articleData.date,
        username: article.articleData.username,
        onClick: getAsyncRefresh(
          async () => article.authorControl.onActivate?.(),
          refresh,
        ),
      },
      onClick: getAsyncRefresh(article.read.bind(article), refresh),
    })) ?? []
  );
};
