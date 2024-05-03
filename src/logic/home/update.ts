update() {
  const username = AppState.currentUserId;
  const tag = AppState.selectedTagId;

  console.warn({ AppState });

  const posts = (
    findFirst([
      AppState.currentTab === ETabType.Personal &&
        !!username &&
        ArticleDatabase.getArticlesByUsername(username),
      ArticleDatabase.getArticlesByPagination({
        index: AppState.currentPaginationTabIndex,
        tag,
      }),
    ]) ?? []
  )
    .filter(Boolean)
    .map(processArticle) as TArticleProps[];

  const nextState: TAppProps<EPage.Home> = {
    page: EPage.Home,
    pageProps: {
      isLoading: AppState.isLoading,
      posts,
      paginationBarProps: {
        numberOfPages: ArticleDatabase.getArticlePaginationTotal({
          tag,
          username:
            AppState.currentTab === ETabType.Personal
              ? AppState.currentUserId
              : undefined,
        }),
        selected: AppState.currentPaginationTabIndex,
      },
      sidebarProps: {
        tags: ArticleDatabase.getAllTags().map((id) => ({ id })),
        title: "Popular Tags",
      },
      tabs: provideTabsProps(),
    },
    navbarProps: provideNavbarProps(),
  };

  return nextState;
}