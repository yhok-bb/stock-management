import { ValueObject } from "Domain/models/shared/ValueObject";

interface PriceValue {
  amount: number;
  currency: 'JPY';
}

export class Price extends ValueObject<PriceValue, 'price'> {
  static readonly MAX = 1000000;
  static readonly MIN = 1;

  constructor(value: PriceValue) {
    super(value)
  }

  protected validate(value: PriceValue) {
    if(value.currency != 'JPY') {
      throw new Error('現在は日本円のみを扱います。')
    }
    if(value.amount < Price.MIN || value.amount > Price.MAX) {
      throw new Error(
        `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`
      )
    }
  };

  get amount(): PriceValue['amount'] {
    return this.value.amount
  }

  get currency(): any {
    return this.value.currency
  }
}