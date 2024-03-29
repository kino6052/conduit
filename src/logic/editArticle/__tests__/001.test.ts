import { sequence } from "../..";
import { EInputConstants } from "../../../components/Input/Input/constants";
import { ETabConstant } from "../../../components/Tab/constants";
import { DefaultAppProps } from "../../../data";
import { ENewPostPageConstant } from "../../../pages/EditArticlePage/constants";
import { EPage } from "../../../types";
import { ESignUpConstant } from "../../signUp/constants";

describe("Navigation", () => {
  it("should visit sign in page when clicked ", async () => {
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
  "page": "NewArticle",
  "pageProps": {
    "articleInputProps": {
      "placeholder": "Article",
      "value": "text",
    },
    "buttonProps": {
      "text": "Publish Article",
    },
    "tags": [
      {
        "id": "1",
        "text": "one",
      },
      {
        "id": "2",
        "text": "two",
      },
      {
        "id": "3",
        "text": "three",
      },
    ],
    "tagsInputProps": {
      "placeholder": "Tags",
      "value": "",
    },
    "titleInputProps": {
      "placeholder": "Title",
      "value": "title",
    },
  },
}
`);
  });
});
