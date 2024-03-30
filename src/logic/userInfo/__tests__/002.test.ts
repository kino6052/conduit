import { sequence } from "../..";
import { EArticleConstant } from "../../../components/Article/constants";
import { EButtonConstants } from "../../../components/Button/constants";
import { EInputConstants } from "../../../components/Input/Input/constants";
import { ETabConstant } from "../../../components/Tab/constants";
import { EUserInfoConstant } from "../../../components/UserInfo/constants";
import { DefaultAppProps } from "../../../data";
import { EArticlePageConstants } from "../../../pages/ArticlePage/constants";
import { ENewPostPageConstant } from "../../../pages/EditArticlePage/constants";
import { EPage } from "../../../types";
import { ArticleDatabase } from "../../data/article";
import { ESignUpConstant } from "../../signUp/constants";

describe("User Info", () => {
  it("should click on user-info when logged out", async () => {
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
        {
          slug: EArticleConstant.Slug,
          id: ArticleDatabase.getArticles().at(-1)?.id,
          type: "onClick",
        },
        {
          slug: EUserInfoConstant.UserInfoSlug,
          id: EArticlePageConstants.UserInfoId,
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
  "page": "Article",
  "pageProps": {
    "bannerProps": {
      "canEdit": false,
      "title": "A good thing",
      "userInfoProps": {
        "date": "Sat Mar 30 2024",
        "username": "jane-lobster",
      },
    },
    "commentBoxProps": {
      "buttonProps": {
        "text": "Comment",
      },
      "iconProps": {
        "icon": "favorite",
      },
      "inputProps": {
        "placeholder": "Your Comment",
        "value": "",
      },
    },
    "comments": [],
    "content": "A good article, a really really good one",
    "favoriteButtonProps": {
      "text": "Favorite",
    },
    "followButtonProps": {
      "text": "Follow",
    },
    "id": "post-1",
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
    "userInfoProps": {
      "date": "Sat Mar 30 2024",
      "username": "jane-lobster",
    },
  },
}
`);
  });
});
