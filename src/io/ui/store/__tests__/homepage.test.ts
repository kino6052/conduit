import { UI } from "..";
import { initializeAppState } from "../../../../model";
import { EPage } from "../../../../model/pages/types";
import { IAppState } from "../../../../model/types";
import { TArticleProps } from "../../view/components/Article/types";
import { TArticlePageProps } from "../../view/pages/ArticlePage/types";
import { THomePageProps } from "../../view/pages/HomePage/types";
import { TAppProps } from "../../view/types";

let state: IAppState;
let ui: TAppProps<EPage>;
const refresh = jest.fn();

beforeEach(async () => {
  refresh.mockRestore();
  state = initializeAppState();
  ui = UI.generateProps(state, refresh);
  await (ui.pageProps as THomePageProps).onMount();
  ui = UI.generateProps(state, refresh);
});

describe("Home Page", () => {
  it("should see initial state", async () => {
    ui = UI.generateProps(state, refresh);
    expect(refresh.mock.calls.length).toMatchInlineSnapshot(`2`);
    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "Home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "NewArticle",
        "isActive": false,
        "onClick": [Function],
        "text": "New Article",
        "variant": "menu",
      },
      {
        "id": "Settings",
        "isActive": false,
        "onClick": [Function],
        "text": "Settings",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "Home",
  "pageProps": {
    "isLoading": false,
    "onMount": [Function],
    "paginationBarProps": {
      "numberOfPages": 1,
      "onClick": [Function],
      "selected": 0,
    },
    "posts": [
      {
        "comments": [],
        "date": "Mon May 06 2024",
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "post-1",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [],
        "title": "A good thing",
        "userInfoProps": {
          "date": "Mon May 06 2024",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
    ],
    "sidebarProps": {
      "tags": [
        {
          "id": "1",
          "onClick": [Function],
        },
        {
          "id": "2",
          "onClick": [Function],
        },
        {
          "id": "3",
          "onClick": [Function],
        },
      ],
      "title": "Popular tags",
    },
    "tabs": [],
  },
}
`);
  });

  it("should navigate to article", async () => {
    const page = ui.pageProps as THomePageProps;
    const post = page.posts[0];

    await post.linkProps.onClick();

    ui = UI.generateProps(state, refresh);

    expect(refresh.mock.calls.length).toMatchInlineSnapshot(`3`);
    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "Home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "NewArticle",
        "isActive": false,
        "onClick": [Function],
        "text": "New Article",
        "variant": "menu",
      },
      {
        "id": "Settings",
        "isActive": false,
        "onClick": [Function],
        "text": "Settings",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "Article",
  "pageProps": {
    "bannerProps": {
      "canEdit": false,
      "title": "",
      "userInfoProps": {
        "date": "",
        "onClick": [Function],
        "username": "",
      },
    },
    "commentBoxProps": {
      "iconProps": {
        "icon": "favorite",
      },
      "inputProps": {
        "onChange": [Function],
        "placeholder": "Input",
        "value": "",
      },
    },
    "comments": [],
    "content": "",
    "favoriteButtonProps": {
      "onClick": [Function],
      "text": "Like",
    },
    "followButtonProps": {
      "onClick": [Function],
      "text": "Follow",
    },
    "onMount": [Function],
    "tags": [],
  },
}
`);
  });

  it("should navigate to the sign in page when you try to like an article", async () => {
    await ui.pageProps.posts[0].likeButtonProps.onClick();

    ui = UI.generateProps(state, refresh);

    expect(refresh.mock.calls.length).toMatchInlineSnapshot(`4`);
    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "Home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "NewArticle",
        "isActive": false,
        "onClick": [Function],
        "text": "New Article",
        "variant": "menu",
      },
      {
        "id": "Settings",
        "isActive": false,
        "onClick": [Function],
        "text": "Settings",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "SignIn",
  "pageProps": {
    "buttonProps": {
      "disabled": false,
      "onClick": [Function],
      "text": "Sign In",
    },
    "linkProps": {
      "onClick": [Function],
    },
    "onMount": [Function],
    "passwordInputProps": {
      "onChange": [Function],
      "placeholder": "Password",
      "value": "",
    },
    "usernameInputProps": {
      "onChange": [Function],
      "placeholder": "Username",
      "value": "",
    },
  },
}
`);
  });

  it("should navigate to the profile when you click on the author", async () => {
    await (ui.pageProps as THomePageProps).posts[0].userInfoProps.onClick();

    ui = UI.generateProps(state, refresh);

    expect(refresh.mock.calls.length).toMatchInlineSnapshot(`3`);
    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "Home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "NewArticle",
        "isActive": false,
        "onClick": [Function],
        "text": "New Article",
        "variant": "menu",
      },
      {
        "id": "Settings",
        "isActive": false,
        "onClick": [Function],
        "text": "Settings",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "isActive": false,
        "onClick": [Function],
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "Profile",
  "pageProps": {
    "bannerProps": {
      "followButtonProps": {
        "onClick": [Function],
        "text": "Follow",
      },
      "userInfoProps": {
        "date": "",
        "username": "jane-lobster",
      },
    },
    "onMount": [Function],
    "paginationBarProps": {
      "numberOfPages": 1,
      "onClick": [Function],
      "selected": 0,
    },
    "posts": [],
    "sidebarProps": {
      "tags": [],
      "title": "Popular",
    },
    "tabs": [],
  },
}
`);
  });
});
