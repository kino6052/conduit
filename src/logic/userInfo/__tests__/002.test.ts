import { sequence } from "../..";
import { EButtonConstants } from "../../../components/Button/constants";
import { EInputConstants } from "../../../components/Input/Input/constants";
import { ETabConstant } from "../../../components/Tab/constants";
import { DefaultAppProps } from "../../../data";
import { ENewPostPageConstant } from "../../../pages/EditArticlePage/constants";
import { EPage } from "../../../types";
import { ESignUpConstant } from "../../signUp/constants";

describe("User Info", () => {
  it('should click on user-info when logged out', async () => {
    const result = await sequence(
      [
        { slug: ETabConstant.Slug, id: EPage.SignUp, type: "onClick" },
        {
          slug: EInputConstants.Slug,
          id: ESignUpConstant.UserNameInputId,
          type: "onChange",
          event: {
            target: {
              value: "testset",
            },
          },
        },
        {
          slug: EInputConstants.Slug,
          id: ESignUpConstant.PasswordInputId,
          type: "onChange",
          event: {
            target: {
              value: "testset",
            },
          },
        },
        {
          slug: EInputConstants.Slug,
          id: ESignUpConstant.SubmitButtonId,
          type: "onClick",
        },
        {
          slug: ETabConstant.Slug,
          id: EPage.NewArticle,
          type: "onClick",
        },
        {
          slug: EInputConstants.Slug,
          id: ENewPostPageConstant.TitleInputId,
          type: "onChange",
          event: {
            target: {
              value: "title",
            },
          },
        },
        {
          slug: EInputConstants.Slug,
          id: ENewPostPageConstant.TextInputId,
          type: "onChange",
          event: {
            target: {
              value: "text",
            },
          },
        },
        {
          slug: EButtonConstants.Slug,
          id: ENewPostPageConstant.SubmitButtonId,
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