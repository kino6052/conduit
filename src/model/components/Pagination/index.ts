export class Pagination {
  private _currentPageNumber = 0;
  public numberOfPages = 1;

  public get currentPageNumber() {
    return this._currentPageNumber;
  }

  public set currentPageNumber(currentPageNumber: number) {
    Math.max(this.numberOfPages, currentPageNumber);
  }

  constructor() {}
}
