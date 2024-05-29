export class Field<T extends string | number> {
  private _value: T;

  public errorMessage: string = "";
  public isDisabled: boolean = false;

  public set value(v: T) {
    this._value = v;
    this.errorMessage = "";
    this.onChange?.();
  }

  public get value(): T {
    return this._value;
  }

  constructor(
    initialValue: T,
    public onChange?: () => Promise<void>,
  ) {
    this._value = initialValue;
  }
}
