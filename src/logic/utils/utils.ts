import { TNavbarProps } from "../../io/ui/view/components/Navbar/types";
import { ETabVariant, TTabProps } from "../../io/ui/view/components/Tab/types";
import { EPage } from "../../types";
import { EventSubject, IEvent } from "../../utils/events";
import { RefreshSubject, refresh } from "../common.logic";
import { AppState } from "../data/app";

export const hasPressedEnter = (event: IEvent) => {
  const _event = event.event as KeyboardEvent;
  return event.type === "onKeyDown" && _event.key === "Enter";
};

export function filterUnique<T>(v: T, i: number, arr: T[]) {
  return arr.findIndex((_v) => _v === v) === i;
}

export const updatePage = (page?: EPage) => {
  if (page) {
    AppState.currentPage = page;
  }

  RefreshSubject.next({});
};

export const wait = async (interval: number) =>
  new Promise<undefined>((res) => {
    setTimeout(() => {
      res(undefined);
    }, interval);
  });

export async function handleAsyncAction<T>(action: Promise<T>) {
  AppState.isLoading = true;
  refresh();
  action.then(() => {
    AppState.isLoading = false;
    refresh();
    EventSubject.next({
      slug: "",
      type: "",
    });
  });
}
