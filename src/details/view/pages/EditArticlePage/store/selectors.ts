import { EditArticlePage } from "../../../../../app/entities/pages/EditArticlePage";
import { NewArticlePage } from "../../../../../app/entities/pages/NewArticlePage";
import { EPage, IPage } from "../../../../../app/entities/pages/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateNewArticlePageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.NewArticle> => {
  const _page = page as NewArticlePage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.NewArticle,
    pageProps: {
      onMount: async () => {},
      articleInputProps: {
        onChange: async (e) => {
          _page.article.value = e.target.value;
          refresh?.();
        },
        placeholder: "Write your article",
        value: _page.article.value,
        isTextArea: true,
      },
      buttonProps: {
        onClick: getAsyncRefresh(
          async () => _page.submitControl?.onActivate?.(),
          refresh,
        ),
        text: "Publish",
        disabled: _page.submitControl?.isDisabled,
      },
      tags: _page
        .generateTags()
        .map((tag) => ({ id: tag, onClick: async () => {} })),
      tagsInputProps: {
        onChange: async (e) => {
          _page.tags.value = e.target.value;
          refresh?.();
        },
        placeholder: "Tags",
        value: _page.tags.value,
      },
      titleInputProps: {
        onChange: async (e) => {
          _page.title.value = e.target.value;
          refresh?.();
        },
        placeholder: "Title",
        value: _page.title.value,
      },
    },
  };
};

export const generateEditArticlePageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.EditArticle> => {
  const _page = page as EditArticlePage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.EditArticle,
    pageProps: {
      onMount: async () => {},
      articleInputProps: {
        onChange: async (e) => {
          _page.article.value = e.target.value;
          refresh?.();
        },
        placeholder: "Write your article",
        value: _page.article.value,
        isTextArea: true,
      },
      buttonProps: {
        onClick: getAsyncRefresh(
          async () => _page.submitControl?.onActivate?.(),
          refresh,
        ),
        text: "Publish",
        disabled: _page.submitControl?.isDisabled,
      },
      tags: _page
        .generateTags()
        .map((tag) => ({ id: tag, onClick: async () => {} })),
      tagsInputProps: {
        onChange: async (e) => {
          _page.tags.value = e.target.value;
          refresh?.();
        },
        placeholder: "Tags",
        value: _page.tags.value,
      },
      titleInputProps: {
        onChange: async (e) => {
          _page.title.value = e.target.value;
          refresh?.();
        },
        placeholder: "Title",
        value: _page.title.value,
      },
    },
  };
};
