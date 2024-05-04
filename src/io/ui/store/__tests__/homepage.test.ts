import { UI } from "..";
import { AppState, initializeAppState } from "../../../../model";
import { IAppState } from "../../../../model/types";

let state: IAppState;

beforeEach(() => {
  state = initializeAppState();
});

describe("Home Page", () => {
  it("should", async () => {
    let ui = UI.generateProps(state);

    console.warn(ui);

    const tab = ui.navbarProps.tabs.find(({ text }) =>
      text.match(new RegExp("article", "i")),
    );

    await tab?.onClick();

    ui = UI.generateProps(state);

    expect(ui).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "logo": {
      "onClick": [Function],
    },
    "tabs": [
      {
        "id": "home",
        "isActive": false,
        "onClick": [Function],
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "article",
        "isActive": false,
        "onClick": [Function],
        "text": "Article",
        "variant": "menu",
      },
    ],
  },
  "page": "Article",
  "pageProps": {
    "bannerProps": {
      "canEdit": false,
      "title": "",
      "userInfoProps": {
        "date": "",
        "onClick": [Function],
        "username": "",
      },
    },
    "commentBoxProps": {
      "iconProps": {
        "icon": "favorite",
      },
      "inputProps": {
        "onChange": [Function],
        "placeholder": "Input",
        "value": "",
      },
    },
    "comments": [],
    "content": "",
    "favoriteButtonProps": {
      "onClick": [Function],
      "text": "Like",
    },
    "followButtonProps": {
      "onClick": [Function],
      "text": "Follow",
    },
    "tags": [],
  },
}
`);
  });
});
