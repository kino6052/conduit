import { Subject } from "rxjs";
import { ViewModel } from "..";
import { defaultComposeApp } from "../../../..";
import { EPage } from "../../../../model/pages/types";
import { THomePageProps } from "../../view/pages/HomePage/types";
import { TAppProps } from "../../view/types";
import { IViewModel } from "../types";

let viewModel: IViewModel;
let ui: TAppProps<EPage>;
const refresh = jest.fn();
const PropsSubject = new Subject<TAppProps<EPage>>();

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout").mockImplementation(async (cb) => cb());
});

beforeEach(async () => {
  viewModel = defaultComposeApp();
  refresh.mockRestore();
  viewModel.onPropsChange((props) => props && PropsSubject.next(props));
});

describe("Home Page", () => {
  it("should see initial state", async () => {
    ui = ViewModel.generateProps(state, refresh);
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
});
