import { EPage, TAppProps } from "../../types";
import { IEvent, getEventTargetValue } from "../../utils/events";
import { ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { getCurrentUser, getIsLoggedIn } from "../utils/user";
import { provideNavbarProps, updatePage } from "../utils/utils";
import { provideArticleAppProps } from "./utils";

export class ArticleLogic {
  public static commentInput: string = "";

  public static update() {
    try {
      const currentArticle = AppState.getCurrentArticle();

      if (!currentArticle) {
        throw new Error("No article selected");
      }

      const nextState: TAppProps<EPage.Article> = provideArticleAppProps(
        processArticle(currentArticle),
      );

      ResultingStateSubject.next(nextState);
    } catch (e) {
      console.error(e);
      updatePage(EPage.Home);
    }
  }

  public static submitComment() {
    try {
      const id = AppState.selectedArticleId;

      if (!id) throw new Error("No article is selected");

      const isLoggedIn = getIsLoggedIn(); // TODO: Move to UserDatabase

      if (!isLoggedIn) {
        updatePage(EPage.SignIn);
        return;
      }

      const value = ArticleLogic.commentInput;

      ArticleLogic.commentInput = "";

      if (!value) return;

      const prevState =
        ResultingStateSubject.getValue() as TAppProps<EPage.Article>;

      const currentUser = getCurrentUser();

      if (!currentUser) return;

      const nextPost = processArticle(
        ArticleDatabase.addCommentById(id, value, currentUser.username),
      );

      const nextState: TAppProps<EPage.Article> = {
        page: EPage.Article,
        pageProps: {
          ...prevState.pageProps,
          comments: nextPost?.comments || [],
          commentBoxProps: {
            ...prevState.pageProps.commentBoxProps,
            inputProps: {
              ...prevState.pageProps.commentBoxProps.inputProps,
              value: ArticleLogic.commentInput,
            },
          },
        },
        navbarProps: provideNavbarProps(),
      };

      ResultingStateSubject.next(nextState);
    } catch (e) {
      console.error(e);
      updatePage(EPage.Home);
    }
  }

  public static handleCommentInput(event: IEvent) {
    const value = getEventTargetValue(event);
    const prevValue = ArticleLogic.commentInput;

    const currentArticle = AppState.getCurrentArticle();

    if (!currentArticle) return;

    ArticleLogic.commentInput = value ?? prevValue;

    const prevState =
      ResultingStateSubject.getValue() as TAppProps<EPage.Article>;

    console.warn(ArticleLogic.commentInput);

    const nextState: TAppProps<EPage.Article> = {
      page: EPage.Article,
      pageProps: {
        ...prevState.pageProps,
        commentBoxProps: {
          ...prevState.pageProps.commentBoxProps,
          inputProps: {
            ...prevState.pageProps.commentBoxProps.inputProps,
            value: ArticleLogic.commentInput,
          },
        },
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState); // FIXME: Rid of explicitly setting nextState and instead reasemble state on refresh
  }

  public static handleRemove() {
    const id = AppState.selectedArticleId;

    if (!id) return;

    ArticleDatabase.removeArticleById(id);

    updatePage(EPage.Home);
  }
}
