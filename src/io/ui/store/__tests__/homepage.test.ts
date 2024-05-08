import { Subject, filter, take, tap } from "rxjs";
import { UI } from "..";
import { initializeAppState } from "../../../../model";
import { EPage } from "../../../../model/pages/types";
import { IAppState } from "../../../../model/types";
import { checkEventual } from "../../../../utils/testing";
import { THomePageProps } from "../../view/pages/HomePage/types";
import { TSignUpPageProps } from "../../view/pages/SignUpPage/types";
import { TAppProps } from "../../view/types";

let state: IAppState;
let ui: TAppProps<EPage>;
const refresh = jest.fn();
const PropsSubject = new Subject<TAppProps<EPage>>();

// TODO: Create "getEventualResult"
beforeEach(async () => {
  state = initializeAppState();
  refresh.mockRestore();
  refresh.mockImplementation(() => {
    ui = UI.generateProps(state, refresh);
    PropsSubject.next(ui);
  });
  ui = UI.generateProps(state, refresh);
  await (ui.pageProps as THomePageProps).onMount();
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
        "date": "",
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
          "date": "",
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

  it("should sign in", async () => {
    await ui.navbarProps.tabs[2].onClick();

    await (ui.pageProps as TSignUpPageProps).usernameInputProps.onChange({
      target: {
        value: "username",
      },
    });

    await (ui.pageProps as TSignUpPageProps).passwordInputProps.onChange({
      target: {
        value: "password",
      },
    });

    await (ui.pageProps as TSignUpPageProps).buttonProps.onClick();

    await ui.pageProps.onMount();

    ui = await checkEventual<TAppProps<EPage>>(
      (result) => (result.pageProps as THomePageProps).posts.length > 0,
      PropsSubject,
    );

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
        "date": "",
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
          "date": "",
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
    await (ui.pageProps as THomePageProps).posts[0].likeButtonProps.onClick();

    expect((ui.pageProps as THomePageProps).posts[0]).toMatchInlineSnapshot(`
{
  "comments": [],
  "date": "",
  "description": "A good article, a really really good one",
  "hasLiked": true,
  "id": "post-1",
  "likeButtonProps": {
    "onClick": [Function],
    "text": "1",
  },
  "likers": [
    "username",
  ],
  "linkProps": {
    "onClick": [Function],
  },
  "onClick": [Function],
  "tags": [],
  "title": "A good thing",
  "userInfoProps": {
    "date": "",
    "onClick": [Function],
    "username": "jane-lobster",
  },
  "username": "jane-lobster",
}
`);

    await (ui.pageProps as THomePageProps).posts[0].likeButtonProps.onClick();

    expect((ui.pageProps as THomePageProps).posts[0]).toMatchInlineSnapshot(`
{
  "comments": [],
  "date": "",
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
    "date": "",
    "onClick": [Function],
    "username": "jane-lobster",
  },
  "username": "jane-lobster",
}
`);
  });
});
