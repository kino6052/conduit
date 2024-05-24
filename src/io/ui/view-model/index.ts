import { BehaviorSubject, tap } from "rxjs";
import { EPage, IPage } from "../../../model/pages/types";
import { TAppProps } from "../view/types";
import { IViewModel, TPropsMap } from "./types";


// TODO: Refactor to become ViewModel (but after tests are done)
export class ViewModel implements IViewModel {
  private PropsSubject = new BehaviorSubject<TAppProps<EPage> | undefined>(
    undefined,
  );

  constructor(private propsMap: TPropsMap, private navigationService: INavigationService) {
    this.refresh();
  }

  /**
   * This method allows to subscribe to changes (required for the view to pick up the changes)
   */
  public onPropsChange(cb: (props: TAppProps<EPage> | undefined) => void) {
    this.PropsSubject.pipe(tap(cb)).subscribe();
  }

  /**
   * This is the pure function that generates props from the store.
   * This is what is required for testing
   */
  public generateProps(
    page: IPage,
    refresh?: () => void,
  ): TAppProps<EPage> {
    return this.propsMap[page.pageType](page, refresh);
  }

  refresh() {
    const nextProps = this.generateProps(this.navigationService.currentPage, this.refresh.bind(this));

    this.PropsSubject.next(nextProps);
  }
}
