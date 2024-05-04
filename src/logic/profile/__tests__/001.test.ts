import { sequence } from "../..";
import { EButtonConstants } from "../../../io/ui/view/components/Button/constants";
import { EInputConstants } from "../../../io/ui/view/components/Input/Input/constants";
import { ENavbarConstant } from "../../../io/ui/view/components/Navbar/constants";
import { ETabConstant } from "../../../io/ui/view/components/Tab/constants";
import { DefaultAppProps } from "../../../data";
import { ENewPostPageConstant } from "../../../io/ui/view/pages/EditArticlePage/constants";
import { EPage } from "../../../io/ui/view/types";
import { ESignUpConstant } from "../../signUp/constants";

describe("Profile", () => {
  it("Should go to profile", async () => {
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
          slug: EInputConstants.Slug,
          id: ENewPostPageConstant.TagsInputId,
          type: "onChange",
          event: {
            target: {
              value: "text text text",
            },
          },
        },
        {
          slug: EButtonConstants.Slug,
          id: ENewPostPageConstant.SubmitButtonId,
          type: "onClick",
        },
        {
          slug: ETabConstant.Slug,
          id: EPage.Profile,
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
  "page": "Profile",
  "pageProps": {
    "bannerProps": {
      "followButtonProps": {
        "id": "",
        "text": "Follow",
      },
      "userInfoProps": {
        "articleIds": [],
        "date": "",
        "favoriteArticleIds": [],
        "followers": [],
        "imageSrc": "",
        "password": "testset",
        "username": "testset",
      },
    },
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
        "tags": [
          {
            "id": "text",
          },
        ],
        "title": "title",
        "userInfoProps": {
          "date": "Sat Mar 30 2024",
          "username": "testset",
        },
      },
    ],
    "sidebarProps": {
      "tags": [
        {
          "id": "text",
        },
      ],
      "title": "Related tags",
    },
    "tabs": [],
  },
}
`);
  });
});
