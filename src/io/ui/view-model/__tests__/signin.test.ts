import { Subject } from "rxjs";
import { ViewModel } from "..";
import { defaultComposeApp } from "../../../../model";
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

beforeAll(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout").mockImplementation(async (cb) => cb());
});

beforeEach(async () => {
  state = defaultComposeApp();
  refresh.mockRestore();
  refresh.mockImplementation(() => {
    ui = ViewModel.generateProps(state, refresh);
    PropsSubject.next(ui);
  });
  ui = ViewModel.generateProps(state, refresh);
  await (ui.pageProps as THomePageProps).onMount();
});

describe("Sign In Page", () => {
  it("should not be able to sign in with an unregistered user", async () => {
    await ui.navbarProps.tabs[1].onClick();

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
      "disabled": false,
      "error": "Wrong username or password",
      "onChange": [Function],
      "placeholder": "Password",
      "value": "password",
    },
    "usernameInputProps": {
      "disabled": false,
      "error": "",
      "onChange": [Function],
      "placeholder": "Username",
      "value": "username",
    },
  },
}
`);
  });

  it("should be able to sign in with a registered user", async () => {
    await ui.navbarProps.tabs[1].onClick();

    await (ui.pageProps as TSignUpPageProps).usernameInputProps.onChange({
      target: {
        value: "jane-lobster",
      },
    });

    await (ui.pageProps as TSignUpPageProps).passwordInputProps.onChange({
      target: {
        value: "123456",
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
  });
});
