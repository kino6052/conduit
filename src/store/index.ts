import { BehaviorSubject, tap } from "rxjs";
import { ETabVariant } from "../components/Tab/types";
import { ArticlePage, HomePage } from "../logic/home/logic";
import { IAppState } from "../logic/types";
import { EPage, TAppProps } from "../types";
import { IUI } from "./types";

const generateNavBarProps = (state: IAppState, refresh?: () => void) => ({
  logo: {
    onClick: () => alert("Test"),
  },
  tabs:
    state.tabs.map((tab) => {
      return {
        id: tab.id,
        onClick: () => {
          tab.open();
          refresh?.();
        },
        text: tab.name,
        variant: ETabVariant.Menu,
        isActive: tab.isSelected,
      };
    }) || [],
});

const generateHomePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Home,
    pageProps: {
      paginationBarProps: {
        numberOfPages: (state.currentPage as HomePage).pagination.numberOfPages,
        selected: (state.currentPage as HomePage).pagination.currentPageNumber,
        onClick: () => {
          console.warn("Click");
        },
      },
      isLoading: state.isLoading,
      posts: [],
      sidebarProps: {
        tags: [],
        title: "Popular tags",
      },
      tabs: [],
    } as TAppProps<EPage.Home>["pageProps"],
  };
};

const generateArticlePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Article> => {
  const page = state.currentPage as ArticlePage;

  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Article,
    pageProps: {
      bannerProps: {
        title: page.article?.title || "",
        canEdit: page.article?.username === state.currentUsername,
        userInfoProps: {
          date: page.article?.date ?? "",
          onClick: () => {
            alert("Click on the author");
          },
          username: page.article?.username ?? "",
        },
      },
      tags: [],
      commentBoxProps: {
        iconProps: {
          icon: "favorite",
        },
        inputProps: {
          onChange: () => {
            alert("Change");
          },
          placeholder: "Input",
          value: "",
        },
      },
      comments: [],
      content: page.article?.description ?? "",
      favoriteButtonProps: {
        onClick: () => {
          alert("Favorite");
        },
        text: "Like",
      },
      followButtonProps: {
        onClick: () => {
          alert("Follow");
        },
        text: "Follow",
      },
    },
  };
};

const propsMap = {
  [EPage.Home]: generateHomePageProps,
  [EPage.Article]: generateArticlePageProps,
};

export class UI implements IUI {
  private PropsSubject = new BehaviorSubject<TAppProps<EPage> | undefined>(
    undefined,
  );

  constructor(private state: IAppState) {
    this.refresh();
  }

  /**
   * This method allows to subscribe to changes (required for the view to pick up the changes)
   */
  public onPropsChange(cb: (props: TAppProps<EPage> | undefined) => void) {
    this.PropsSubject.pipe(tap(cb)).subscribe();
  }

  /**
   * This is the pure function that generates props from the store.
   * This is what is required for testing
   */
  public static generateProps(
    state: IAppState,
    refresh?: () => void,
  ): TAppProps<EPage> {
    const page = state.currentPage?.pageType || EPage.Home;
    return propsMap[page](state, refresh);
  }

  refresh() {
    const nextProps = UI.generateProps(this.state, this.refresh.bind(this));

    this.PropsSubject.next(nextProps);
  }
}
