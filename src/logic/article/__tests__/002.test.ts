import { sequence } from "../..";
import { EArticleConstant } from "../../../components/Article/constants";
import { DefaultAppProps } from "../../../data";
import { ArticleDatabase } from "../../data/article";
import { createUserSequence } from "../../utils/sequences";

describe("Article", () => {
  it("should unlike article", async () => {
    const result = await sequence(
      [
        ...createUserSequence,
        {
          slug: EArticleConstant.LikeButtonSlug,
          id: ArticleDatabase.getArticleIds()[0],
          type: "onClick",
        },
        {
          slug: EArticleConstant.LikeButtonSlug,
          id: ArticleDatabase.getArticleIds()[0],
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
        "icon": "edit",
        "id": "NewArticle",
        "text": "New Post",
        "variant": "menu",
      },
      {
        "icon": "settings",
        "id": "Settings",
        "text": "Settings",
        "variant": "menu",
      },
      {
        "icon": "person",
        "id": "Profile",
        "text": "testset",
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
