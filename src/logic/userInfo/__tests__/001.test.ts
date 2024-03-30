import { sequence } from "../..";
import { EUserInfoConstant } from "../../../components/UserInfo/constants";
import { DefaultAppProps } from "../../../data";
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
  "page": "Home",
  "pageProps": {
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
        "likes": 0,
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
          "date": "Sat Mar 30 2024",
          "username": "jane-lobster",
        },
      },
    ],
    "sidebarProps": {
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
      "title": "Popular Tags",
    },
    "tabs": [],
  },
}
`);
  });
});
