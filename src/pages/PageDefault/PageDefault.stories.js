import { PageDefault } from ".";
import { DefaultState } from "./PageDefault";
import { EventSubject } from "../../utils/events";

export default {
  title: "Components/PageDefault",
  component: PageDefault,
};

export const Default = {
  args: DefaultState,
};

EventSubject.subscribe(console.warn);
