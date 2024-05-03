import { BehaviorSubject, tap } from "rxjs";
import { ETabVariant } from "../components/Tab/types";
import { IApp } from "../logic/types";
import { EPage, TAppProps } from "../types";
import { IUI } from "./types";
import { HomePage } from "../logic/home/logic";

export class UI implements IUI {
  private PropsSubject = new BehaviorSubject<TAppProps<EPage> | undefined>(
    undefined,
  );

  constructor(private app: IApp) {
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
    app: IApp,
    refresh?: () => void,
  ): TAppProps<EPage> {
    return {
      navbarProps: {
        logo: {
          onClick: () => alert("Test"),
        },
        tabs: app.navbar.tabs.map((tab) => {
          return {
            id: tab.id,
            onClick: () => {
              app.navbar.changeTab(tab.id);
              refresh?.();
            },
            text: tab.name,
            variant: ETabVariant.Menu,
            isActive: tab.isSelected,
          };
        }),
      },
      page: EPage.Home,
      pageProps: {
        paginationBarProps: {
          numberOfPages: (app.page as HomePage).pagination.numberOfPages,
          selected: (app.page as HomePage).pagination.currentPageNumber,
          onClick: () => {
            console.warn("Click");
          },
        },
        isLoading: false,
        posts: [],
        sidebarProps: {
          tags: [],
          title: "Popular tags",
        },
        tabs: [],
      } as TAppProps<EPage.Home>["pageProps"],
    };
  }

  refresh() {
    const nextProps = UI.generateProps(this.app, this.refresh.bind(this));

    this.PropsSubject.next(nextProps);
  }
}
