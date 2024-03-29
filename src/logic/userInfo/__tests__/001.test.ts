import { sequence } from "../..";
import { DefaultAppProps } from "../../../data";
import { EPage } from "../../../types";

describe("User Info", () => {
  it('should click on user-info when logged out', async () => {
    const result = await sequence(
      [
        { slug: E.Slug, id: EPage.SignUp, type: "onClick" },
        
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
        "description": "text",
        "hasLiked": false,
        "id": "1",
        "likes": 0,
        "tags": [],
        "title": "title",
        "userInfoProps": {
          "articleIds": [],
          "date": "",
          "favoriteArticleIds": [],
          "imageSrc": "",
          "password": "testset",
          "username": "testset",
        },
      },
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
  })
})