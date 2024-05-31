import { BehaviorSubject } from "rxjs";
import { EPage } from "../../../app/entities/pages/types";
import { TAppProps } from "../../view/types";
import { IViewModel } from "../types";
import { defaultComposeApp } from "../..";
import { checkEventual } from "../../../utils/testing";
import { THomePageProps } from "../../view/pages/HomePage/types";

let viewModel: IViewModel;
let ui: TAppProps<EPage>;
const refresh = jest.fn();
const PropsSubject = new BehaviorSubject<TAppProps<EPage> | undefined>(
  undefined,
);

beforeEach(() => {
  jest.useFakeTimers();
  // @ts-ignore
  jest.spyOn(global, "setTimeout").mockImplementation(async (cb) => cb());
});

beforeEach(async () => {
  viewModel = defaultComposeApp();
  refresh.mockRestore();
  viewModel.onPropsChange((props) => {
    console.warn({ props });
    if (!props?.pageProps) return;
    PropsSubject.next(props);
    ui = props as TAppProps<EPage>;
  });
});

describe("Home Page Model", () => {
  it("should navigate to user profile", async () => {
    await checkEventual(
      (props) => (props?.pageProps as THomePageProps).posts.length > 0,
      PropsSubject,
    );
    (ui as TAppProps<EPage.Home>).pageProps.posts[0].userInfoProps.onClick?.();
    await checkEventual((props) => props?.page === EPage.Profile, PropsSubject);
    expect(ui.page).toMatchInlineSnapshot(`"Profile"`);
  });
});
