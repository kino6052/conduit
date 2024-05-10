import { Subject } from "rxjs";
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

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout").mockImplementation(async (cb) => cb());
});

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
      "pages": [
        {
          "isSelected": true,
          "onClick": [Function],
          "text": "1",
        },
        {
          "isSelected": false,
          "onClick": [Function],
          "text": "2",
        },
      ],
    },
    "posts": [
      {
        "comments": [],
        "date": "",
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "test-post-1",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "1",
            "onClick": [Function],
          },
        ],
        "title": "A good thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
      {
        "comments": [],
        "date": "",
        "description": "A bad article, a really really bad one",
        "hasLiked": false,
        "id": "test-post-2",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "2",
            "onClick": [Function],
          },
        ],
        "title": "A bad thing",
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
      ],
      "title": "Popular tags",
    },
    "tabs": [
      {
        "id": "GlobalFeed",
        "isActive": true,
        "onClick": [Function],
        "text": "Global Feed",
        "variant": "default",
      },
    ],
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
      "buttonProps": {
        "disabled": false,
        "onClick": [Function],
        "text": "Submit",
      },
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
      "hasIcon": true,
      "onClick": [Function],
      "text": "Like",
      "variant": "secondary",
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
      "disabled": true,
      "onClick": [Function],
      "text": "Sign In",
    },
    "linkProps": {
      "onClick": [Function],
    },
    "onMount": [Function],
    "passwordInputProps": {
      "disabled": false,
      "error": "",
      "onChange": [Function],
      "placeholder": "Password",
      "value": "",
    },
    "usernameInputProps": {
      "disabled": false,
      "error": "",
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
  "page": "Profile",
  "pageProps": {
    "bannerProps": {
      "followButtonProps": {
        "disabled": false,
        "onClick": [Function],
        "text": "Follow",
      },
      "userInfoProps": {
        "date": "",
        "imageSrc": "https://c.tenor.com/lhuFqfMRxvEAAAAd/tenor.gif",
        "username": "jane-lobster",
      },
    },
    "isLoading": false,
    "onMount": [Function],
    "paginationBarProps": {
      "pages": [
        {
          "isSelected": true,
          "onClick": [Function],
          "text": "1",
        },
        {
          "isSelected": false,
          "onClick": [Function],
          "text": "2",
        },
      ],
    },
    "posts": [
      {
        "comments": [],
        "date": "",
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "test-post-1",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "1",
            "onClick": [Function],
          },
        ],
        "title": "A good thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
      {
        "comments": [],
        "date": "",
        "description": "A bad article, a really really bad one",
        "hasLiked": false,
        "id": "test-post-2",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "2",
            "onClick": [Function],
          },
        ],
        "title": "A bad thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
    ],
    "sidebarProps": {
      "tags": [],
      "title": "Popular",
    },
    "tabs": [],
  },
}
`);
  });

  it("should navigate to the profile when you click on the author", async () => {
    await (ui.pageProps as THomePageProps).posts[0].userInfoProps.onClick();

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
  "page": "Profile",
  "pageProps": {
    "bannerProps": {
      "followButtonProps": {
        "disabled": false,
        "onClick": [Function],
        "text": "Follow",
      },
      "userInfoProps": {
        "date": "",
        "imageSrc": "https://c.tenor.com/lhuFqfMRxvEAAAAd/tenor.gif",
        "username": "jane-lobster",
      },
    },
    "isLoading": false,
    "onMount": [Function],
    "paginationBarProps": {
      "pages": [
        {
          "isSelected": true,
          "onClick": [Function],
          "text": "1",
        },
        {
          "isSelected": false,
          "onClick": [Function],
          "text": "2",
        },
      ],
    },
    "posts": [
      {
        "comments": [],
        "date": "",
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "test-post-1",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "1",
            "onClick": [Function],
          },
        ],
        "title": "A good thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
      {
        "comments": [],
        "date": "",
        "description": "A bad article, a really really bad one",
        "hasLiked": false,
        "id": "test-post-2",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "2",
            "onClick": [Function],
          },
        ],
        "title": "A bad thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
    ],
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
      "pages": [
        {
          "isSelected": true,
          "onClick": [Function],
          "text": "1",
        },
        {
          "isSelected": false,
          "onClick": [Function],
          "text": "2",
        },
      ],
    },
    "posts": [
      {
        "comments": [],
        "date": "",
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "test-post-1",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "1",
            "onClick": [Function],
          },
        ],
        "title": "A good thing",
        "userInfoProps": {
          "date": "",
          "onClick": [Function],
          "username": "jane-lobster",
        },
        "username": "jane-lobster",
      },
      {
        "comments": [],
        "date": "",
        "description": "A bad article, a really really bad one",
        "hasLiked": false,
        "id": "test-post-2",
        "likeButtonProps": {
          "onClick": [Function],
          "text": "0",
        },
        "likers": [],
        "linkProps": {
          "onClick": [Function],
        },
        "onClick": [Function],
        "tags": [
          {
            "id": "2",
            "onClick": [Function],
          },
        ],
        "title": "A bad thing",
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
      ],
      "title": "Popular tags",
    },
    "tabs": [
      {
        "id": "GlobalFeed",
        "isActive": true,
        "onClick": [Function],
        "text": "Global Feed",
        "variant": "default",
      },
      {
        "id": "YourFeed",
        "isActive": false,
        "onClick": [Function],
        "text": "Your Feed",
        "variant": "default",
      },
    ],
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
  "id": "test-post-1",
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
  "tags": [
    {
      "id": "1",
      "onClick": [Function],
    },
  ],
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
  "id": "test-post-1",
  "likeButtonProps": {
    "onClick": [Function],
    "text": "0",
  },
  "likers": [],
  "linkProps": {
    "onClick": [Function],
  },
  "onClick": [Function],
  "tags": [
    {
      "id": "1",
      "onClick": [Function],
    },
  ],
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

  it("should navigate between content tabs", async () => {
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

    ui.pageProps.onMount();

    ui = await checkEventual<TAppProps<EPage>>(
      (result) => result.pageProps.posts.length > 0,
      PropsSubject,
    );

    await (ui.pageProps as THomePageProps).tabs[1].onClick();

    expect(ui.pageProps as THomePageProps).toMatchInlineSnapshot(`
{
  "isLoading": false,
  "onMount": [Function],
  "paginationBarProps": {
    "pages": [
      {
        "isSelected": true,
        "onClick": [Function],
        "text": "1",
      },
      {
        "isSelected": false,
        "onClick": [Function],
        "text": "2",
      },
    ],
  },
  "posts": [],
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
    ],
    "title": "Popular tags",
  },
  "tabs": [
    {
      "id": "GlobalFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Global Feed",
      "variant": "default",
    },
    {
      "id": "YourFeed",
      "isActive": true,
      "onClick": [Function],
      "text": "Your Feed",
      "variant": "default",
    },
  ],
}
`);
  });

  it("should navigate to tags", async () => {
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

    ui.pageProps.onMount();

    ui = await checkEventual<TAppProps<EPage>>(
      (result) => !result.pageProps.isLoading && result.page === EPage.Home,
      PropsSubject,
    );

    await (ui.pageProps as THomePageProps).sidebarProps.tags[0].onClick();

    expect(ui.pageProps).toMatchInlineSnapshot(`
{
  "isLoading": false,
  "onMount": [Function],
  "paginationBarProps": {
    "pages": [
      {
        "isSelected": true,
        "onClick": [Function],
        "text": "1",
      },
    ],
  },
  "posts": [
    {
      "comments": [],
      "date": "",
      "description": "A good article, a really really good one",
      "hasLiked": false,
      "id": "test-post-1",
      "likeButtonProps": {
        "onClick": [Function],
        "text": "0",
      },
      "likers": [],
      "linkProps": {
        "onClick": [Function],
      },
      "onClick": [Function],
      "tags": [
        {
          "id": "1",
          "onClick": [Function],
        },
      ],
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
    ],
    "title": "Popular tags",
  },
  "tabs": [
    {
      "id": "GlobalFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Global Feed",
      "variant": "default",
    },
    {
      "id": "YourFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Your Feed",
      "variant": "default",
    },
    {
      "id": "Tag",
      "isActive": true,
      "onClick": [Function],
      "text": "1",
      "variant": "default",
    },
  ],
}
`);

    await (ui.pageProps as THomePageProps).sidebarProps.tags[1].onClick();

    expect(ui.pageProps).toMatchInlineSnapshot(`
{
  "isLoading": false,
  "onMount": [Function],
  "paginationBarProps": {
    "pages": [
      {
        "isSelected": true,
        "onClick": [Function],
        "text": "1",
      },
      {
        "isSelected": false,
        "onClick": [Function],
        "text": "2",
      },
    ],
  },
  "posts": [
    {
      "comments": [],
      "date": "",
      "description": "A bad article, a really really bad one",
      "hasLiked": false,
      "id": "test-post-2",
      "likeButtonProps": {
        "onClick": [Function],
        "text": "0",
      },
      "likers": [],
      "linkProps": {
        "onClick": [Function],
      },
      "onClick": [Function],
      "tags": [
        {
          "id": "2",
          "onClick": [Function],
        },
      ],
      "title": "A bad thing",
      "userInfoProps": {
        "date": "",
        "onClick": [Function],
        "username": "jane-lobster",
      },
      "username": "jane-lobster",
    },
    {
      "comments": [],
      "date": "",
      "description": "A bad article, a really really bad one",
      "hasLiked": false,
      "id": "test-post-3",
      "likeButtonProps": {
        "onClick": [Function],
        "text": "0",
      },
      "likers": [],
      "linkProps": {
        "onClick": [Function],
      },
      "onClick": [Function],
      "tags": [
        {
          "id": "2",
          "onClick": [Function],
        },
      ],
      "title": "A bad thing",
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
    ],
    "title": "Popular tags",
  },
  "tabs": [
    {
      "id": "GlobalFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Global Feed",
      "variant": "default",
    },
    {
      "id": "YourFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Your Feed",
      "variant": "default",
    },
    {
      "id": "Tag",
      "isActive": true,
      "onClick": [Function],
      "text": "2",
      "variant": "default",
    },
  ],
}
`);
  });

  it("should paginate", async () => {
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

    ui.pageProps.onMount();

    ui = await checkEventual<TAppProps<EPage>>(
      (result) => !result.pageProps.isLoading && result.page === EPage.Home,
      PropsSubject,
    );

    await (
      ui.pageProps as THomePageProps
    ).paginationBarProps.pages[1].onClick();

    expect(ui.pageProps).toMatchInlineSnapshot(`
{
  "isLoading": false,
  "onMount": [Function],
  "paginationBarProps": {
    "pages": [
      {
        "isSelected": false,
        "onClick": [Function],
        "text": "1",
      },
      {
        "isSelected": true,
        "onClick": [Function],
        "text": "2",
      },
    ],
  },
  "posts": [
    {
      "comments": [],
      "date": "",
      "description": "A bad article, a really really bad one",
      "hasLiked": false,
      "id": "test-post-3",
      "likeButtonProps": {
        "onClick": [Function],
        "text": "0",
      },
      "likers": [],
      "linkProps": {
        "onClick": [Function],
      },
      "onClick": [Function],
      "tags": [
        {
          "id": "2",
          "onClick": [Function],
        },
      ],
      "title": "A bad thing",
      "userInfoProps": {
        "date": "",
        "onClick": [Function],
        "username": "jane-lobster",
      },
      "username": "jane-lobster",
    },
    {
      "comments": [],
      "date": "",
      "description": "A bad article, a really really bad one",
      "hasLiked": false,
      "id": "test-post-4",
      "likeButtonProps": {
        "onClick": [Function],
        "text": "0",
      },
      "likers": [],
      "linkProps": {
        "onClick": [Function],
      },
      "onClick": [Function],
      "tags": [
        {
          "id": "2",
          "onClick": [Function],
        },
      ],
      "title": "A bad thing",
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
    ],
    "title": "Popular tags",
  },
  "tabs": [
    {
      "id": "GlobalFeed",
      "isActive": true,
      "onClick": [Function],
      "text": "Global Feed",
      "variant": "default",
    },
    {
      "id": "YourFeed",
      "isActive": false,
      "onClick": [Function],
      "text": "Your Feed",
      "variant": "default",
    },
  ],
}
`);
  });
});
