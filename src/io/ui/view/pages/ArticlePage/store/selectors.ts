import { ArticlePage } from "../../../../../../model/pages/ArticlePage";
import { EPage } from "../../../../../../model/pages/types";
import { INavigationService } from "../../../../../../model/services/NavigationService/types";
import { EButtonVariant } from "../../../components/Button/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateArticlePageProps = (
  navigationService: INavigationService,
  refresh?: () => void,
): TAppProps<EPage.Article> => {
  const page = navigationService.currentPage as ArticlePage;

  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Article,
    pageProps: {
      bannerProps: {
        title: page.article?.articleData.title || "",
        canEdit: !page.editControl?.isDisabled,
        userInfoProps: {
          date: page.article?.articleData.date ?? "",
          username: page.article?.articleData.username ?? "",
          onClick: getAsyncRefresh(async () => page.article?.read(), refresh),
        },
        editButtonProps: {
          text: "",
          onClick: getAsyncRefresh(
            async () => page.editControl?.onActivate?.(),
            refresh,
          ),
        },
        deleteButtonProps: {
          text: "",
          onClick: getAsyncRefresh(
            async () => page.deleteControl?.onActivate?.(),
            refresh,
          ),
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
          text: page.submitCommentControl?.text ?? "",
          onClick: getAsyncRefresh(
            async () => page.submitCommentControl?.onActivate?.(),
            refresh,
          ),
          disabled: page.submitCommentControl?.isDisabled,
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
            onClick: getAsyncRefresh(async () => {}, refresh),
          },
        })) ?? [],
      content: page.article?.articleData.description ?? "",
      favoriteButtonProps: {
        onClick: getAsyncRefresh(
          async () => page.article?.likeControl.onActivate?.(),
          refresh,
        ),
        text: page.article?.likeControl.text ?? "",
        hasIcon: true,
        variant: EButtonVariant.Secondary,
      },
      followButtonProps: {
        onClick: getAsyncRefresh(async () => {}, refresh),
        text: "",
      },
    },
  };
};
