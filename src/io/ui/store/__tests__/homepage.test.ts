import { UI } from "..";
import { initializeAppState } from "../../../../model";
import { IAppState } from "../../../../model/types";
import { THomePageProps } from "../../view/pages/HomePage/types";

let state: IAppState;

beforeEach(() => {
  state = initializeAppState();
});

describe("Home Page", () => {
  it("should see initial state", async () => {
    let ui = UI.generateProps(state);

    await (ui.pageProps as THomePageProps).onMount();

    ui = UI.generateProps(state);

    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "article",
        "isActive": false,
        "onClick": [Function],
        "text": "Article",
        "variant": "menu",
      },
    ],
  },
  "page": "Home",
  "pageProps": {
    "isLoading": false,
    "paginationBarProps": {
      "numberOfPages": 1,
      "onClick": [Function],
      "selected": 0,
    },
    "posts": [
      {
        "comments": [],
        "date": "Sat Mar 30 2024",
        "description": "A good article, a really really good one",
        "id": "post-1",
        "likers": [],
        "tags": [
          "1",
          "2",
          "3",
        ],
        "title": "A good thing",
        "username": "jane-lobster",
      },
    ],
    "sidebarProps": {
      "tags": [
        "1",
        "2",
        "3",
      ],
      "title": "Popular tags",
    },
    "tabs": [],
  },
}
`);
  });

  it("should navigate to article", async () => {
    let ui = UI.generateProps(state);

    console.warn(ui);

    const page = ui.pageProps as THomePageProps;

    const post = page.posts[0];

    await post.linkProps.onClick();

    ui = UI.generateProps(state);

    expect(ui).toMatchInlineSnapshot();
  });
});
