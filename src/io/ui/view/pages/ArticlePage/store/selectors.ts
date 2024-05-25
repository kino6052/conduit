import { ArticlePage } from "../../../../../../model/pages/ArticlePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { EButtonVariant } from "../../../components/Button/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateArticlePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Article> => {
  const page = state.currentPage as ArticlePage;

  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Article,
    pageProps: {
      onMount: getAsyncRefresh(page.initialize.bind(page), refresh),
      bannerProps: {
        title: page.article?.articleData.title || "",
        canEdit: page.article?.articleData.username === state.currentUsername,
        userInfoProps: {
          date: page.article?.articleData.date ?? "",
          username: page.article?.articleData.username ?? "",
          onClick: getAsyncRefresh(async () => {
            const author = await page.article?.getAuthor();
            await author?.examine();
          }, refresh),
        },
        editButtonProps: {
          text: "",
          onClick: getAsyncRefresh(page.edit.bind(page), refresh),
        },
        deleteButtonProps: {
          text: "",
          onClick: getAsyncRefresh(page.deleteArticle.bind(page), refresh),
        },
      },
      tags: [],
      commentBoxProps: {
        iconProps: {
          icon: "favorite",
        },
        inputProps: {
          onChange: async (e) => {
            page.comment.value = e.target.value ?? "";
            refresh?.();
          },
          placeholder: "Input",
          value: page.comment.value,
        },
        buttonProps: {
          text: page.submitCommentControl.text,
          onClick: getAsyncRefresh(page.publishComment.bind(page), refresh),
          disabled: page.submitCommentControl.isDisabled,
        },
      },
      comments:
        page.article?.articleData.comments.map((comment) => ({
          iconProps: {
            icon: "favorite",
            text: comment?.username,
          },
          inputProps: {
            value: comment.text ?? "",
            disabled: true,
            onChange: async () => {},
            placeholder: "",
          },
          userInfoProps: {
            date: "",
            username: comment.username ?? "",
            onClick: getAsyncRefresh(async () => {
              const author = await page.article?.getAuthor();
              await author?.examine();
            }, refresh),
          },
        })) ?? [],
      content: page.article?.articleData.description ?? "",
      favoriteButtonProps: {
        onClick: getAsyncRefresh(
          async () => page.article?.toggleLike.bind(page.article)(),
          refresh,
        ),
        text: page.article?.hasLiked ? "Unlike" : "Like",
        hasIcon: true,
        variant: EButtonVariant.Secondary,
      },
      followButtonProps: {
        onClick: getAsyncRefresh(async () => {
          await page.article?.authorControl.toggleFollowBy(
            state.currentUsername,
          );
        }, refresh),
        text: page.article?.author?.isFollowing ? "Unfollow" : "Follow",
      },
    },
  };
};
