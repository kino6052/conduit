import { sequence } from "../..";
import { EArticleConstant } from "../../../components/Article/constants";
import { EButtonConstants } from "../../../components/Button/constants";
import { EInputConstants } from "../../../components/Input/Input/constants";
import { DefaultAppProps } from "../../../data";
import { EArticlePageConstants } from "../../../pages/ArticlePage/constants";
import { ArticleDatabase } from "../../data/article";
import { createUserSequence } from "../../utils/sequences";

describe("Article", () => {
  it("should add comment", async () => {
    const result = await sequence(
      [
        ...createUserSequence,
        {
          type: "onClick",
          slug: EArticleConstant.Slug,
          id: ArticleDatabase.getArticles()[0]?.id,
        },
        {
          type: "onChange",
          slug: EInputConstants.Slug,
          id: EArticlePageConstants.CommentInputId,
          event: {
            target: {
              value: "comment",
            },
          },
        },
        {
          type: "onClick",
          slug: EButtonConstants.Slug,
          id: EArticlePageConstants.SubmitCommentButtonId,
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
    "comments": [
      {
        "iconProps": {
          "icon": "",
        },
        "id": "1",
        "inputProps": {
          "id": "1",
          "placeholder": "",
          "value": "comment",
        },
        "userInfoProps": {
          "date": "Sat Mar 30 2024",
          "username": "testset",
        },
      },
    ],
    "content": "A good article, a really really good one",
    "favoriteButtonProps": {
      "text": "Favorite",
    },
    "followButtonProps": {
      "text": "Follow",
    },
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
