export class Field<T extends string | number> {
  public errorMessage: string = "";

  constructor(public value: T) {}
}
