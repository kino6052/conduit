import { IApp, INavbar } from "../types";
import { TPageMap } from "./map";

export class App implements IApp {
  constructor(
    public pageMap: TPageMap,
    public navbar: INavbar,
  ) {}
}
