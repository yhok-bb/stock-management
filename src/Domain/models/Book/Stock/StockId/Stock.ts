import { ValueObject } from "Domain/models/shared/ValueObject";
import { nanoid } from "nanoid";

type StockIdValue = string;
export class StockId extends ValueObject<StockIdValue, 'stockId'> {
  static MAX_LENGTH = 100;
  static MIN_LENGTH = 1;
  constructor(value: StockIdValue = nanoid()) {
    super(value)
  }

  protected validate(value: StockIdValue): void {
    if(value.length < StockId.MIN_LENGTH || value.length > StockId.MAX_LENGTH) {
      throw new Error(
        `StockIdは${StockId.MIN_LENGTH}文字以上、${StockId.MAX_LENGTH}文字以下でなければなりません。`
      );
    }
  };
}