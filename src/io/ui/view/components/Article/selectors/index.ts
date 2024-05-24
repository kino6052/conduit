import { ArticlePreviewPage } from "../../../../../../model/pages/ArticlePreviewPage";
import { IAppState } from "../../../../../../model/types";
import { getAsyncRefresh } from "../../../utils/utils";

export const generatePostsProps = (state: IAppState, refresh?: () => void) => {
  return (
    (state.currentPage as ArticlePreviewPage | undefined)?.articles.map(
      (article) => ({
        ...article.articleData,
        comments: [],
        tags: article.articleData.tags.map((tag) => ({
          id: tag,
          onClick: getAsyncRefresh(
            async () =>
              (state.currentPage as ArticlePreviewPage | undefined)?.selectTag(
                tag,
              ),
            refresh,
          ),
        })),
        hasLiked: article.articleData.likers.includes(state.currentUsername),
        likeButtonProps: {
          onClick: getAsyncRefresh(async () => article.likeControl.onActivate?.bind(article)(), refresh),
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
          onClick: getAsyncRefresh(async () => {
            const author = await article.getAuthor();
            await author?.examine();
          }, refresh),
        },
        onClick: async () => {
          article.read();
          refresh?.();
        },
      }),
    ) ?? []
  );
};
