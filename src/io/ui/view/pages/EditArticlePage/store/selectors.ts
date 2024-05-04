import { NewArticlePage } from "../../../../../../model/pages/NewArticlePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateNewArticlePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.NewArticle> => {
  const page = state.currentPage as NewArticlePage;
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.NewArticle,
    pageProps: {
      onMount: async () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
      isLoading: state.isLoading,
      articleInputProps: {
        onChange: async (e) => {
          page.article = e.target.value;
          refresh?.();
        },
        placeholder: "Write your article",
        value: page.article,
        isTextArea: true,
      },
      buttonProps: {
        onClick: async () => {
          const result = page.publishArticle().then(() => {
            refresh?.();
          });
          refresh?.();
          return result;
        },
        text: "Publish",
        disabled: !page.article || !page.title,
      },
      tags: page.generateTags().map((tag) => ({ id: tag, onClick: () => {} })),
      tagsInputProps: {
        onChange: async (e) => {
          page.tags = e.target.value;
          refresh?.();
        },
        placeholder: "Tags",
        value: page.tags,
      },
      titleInputProps: {
        onChange: async (e) => {
          page.title = e.target.value;
          refresh?.();
        },
        placeholder: "Title",
        value: page.title,
      },
    },
  };
};
