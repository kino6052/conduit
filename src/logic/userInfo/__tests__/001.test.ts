import { sequence } from "../..";
import { EUserInfoConstant } from "../../../components/UserInfo/constants";
import { DefaultAppProps } from "../../../data";
import { EPage } from "../../../types";
import { ArticleDatabase } from "../../data/article";

describe("User Info", () => {
  it("should click on user-info when logged out", async () => {
    const result = await sequence(
      [
        {
          slug: EUserInfoConstant.UserInfoSlug,
          id: ArticleDatabase.getArticles()[0]?.id,
          type: "onClick",
        },
      ],
      DefaultAppProps,
    );

    expect(result).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "tabs": [
      {
        "id": "Home",
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "Profile",
  "pageProps": {
    "bannerProps": {
      "userInfoProps": {
        "articleIds": [
          "post-1",
        ],
        "date": "",
        "favoriteArticleIds": [],
        "password": "123456",
        "username": "jane-lobster",
      },
    },
    "paginationBarProps": {
      "numberOfPages": 1,
      "selected": 0,
    },
    "posts": [
      {
        "comments": [],
        "description": "A good article, a really really good one",
        "hasLiked": false,
        "id": "post-1",
        "likes": 24,
        "tags": [
          {
            "id": "1",
          },
          {
            "id": "2",
          },
          {
            "id": "3",
          },
        ],
        "title": "A good thing",
        "userInfoProps": {
          "date": "01 January 2024",
          "username": "jane-lobster",
        },
      },
    ],
    "sidebarProps": {
      "tags": [],
      "title": "Popular tags",
    },
    "tabs": [],
  },
}
`);
  });
});
