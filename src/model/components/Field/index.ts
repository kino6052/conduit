export class Field<T extends string | number> {
  public errorMessage: string = "";
  public _value: T;

  public set value(v: T) {
    this._value = v;
    this.errorMessage = "";
  }

  public get value(): T {
    return this._value;
  }

  constructor(initialValue: T) {
    this._value = initialValue;
  }
}
