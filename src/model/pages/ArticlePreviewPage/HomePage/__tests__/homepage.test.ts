import { uniqueId } from "lodash";
import { HomePage } from "..";
import { ArticleDAOTestDouble } from "../../../../data/ArticleDAO";
import { SimpleArticleService } from "../../../../services/ArticleService/implementations/SimpleArticleService";
import { SimpleUserService } from "../../../../services/UserService/implementations/SimpleUserService";
import { UserDAOTestDouble } from "../../../../data/UserDAO";
import { SimpleNavigationService } from "../../../../services/NavigationService/implementations/SimpleNavigationService";
import { INavigationService } from "../../../../services/NavigationService/types";

let page: HomePage;
let navigationService: INavigationService;

beforeEach(async () => {
  const articleDao = new ArticleDAOTestDouble(
    () => "123",
    () => uniqueId(),
  );
  const userDao = new UserDAOTestDouble();
  navigationService = new SimpleNavigationService({});
  const userService = new SimpleUserService(userDao, navigationService);
  const articleService = new SimpleArticleService(
    articleDao,
    navigationService,
    userService,
  );
  page = await HomePage.create(articleService, navigationService);
});

describe("Home Page Model", () => {
  it("should", () => {
    expect(page.articles.length).toMatchInlineSnapshot(`2`);
    expect(page.tags).toMatchInlineSnapshot(`
ExclusiveSelector {
  "cb": [Function],
  "items": [
    {
      "id": "1",
      "isSelected": false,
      "name": "1",
      "select": [Function],
    },
    {
      "id": "2",
      "isSelected": false,
      "name": "2",
      "select": [Function],
    },
  ],
}
`);
    expect(page.tabs?.items).toMatchInlineSnapshot(`
[
  {
    "id": "GlobalFeed",
    "isSelected": true,
    "select": [Function],
    "text": "Global Feed",
  },
]
`);
  });

  it("should", async () => {
    await page.tags?.items[0].select();
    expect(page.articles.length).toMatchInlineSnapshot(`1`);
    expect(page.tags).toMatchInlineSnapshot(`
ExclusiveSelector {
  "cb": [Function],
  "items": [
    {
      "id": "1",
      "isSelected": true,
      "name": "1",
      "select": [Function],
    },
    {
      "id": "2",
      "isSelected": false,
      "name": "2",
      "select": [Function],
    },
  ],
}
`);
    expect(page.tabs?.items).toMatchInlineSnapshot(`
[
  {
    "id": "GlobalFeed",
    "isSelected": false,
    "select": [Function],
    "text": "Global Feed",
  },
  {
    "id": "Tag",
    "isSelected": true,
    "select": [Function],
    "text": "1",
  },
]
`);
  });

  it.only("should", async () => {
    await page.articles[0].authorControl.onActivate?.();
    expect(navigationService.currentPage).toMatchInlineSnapshot(`undefined`);
  });
});
