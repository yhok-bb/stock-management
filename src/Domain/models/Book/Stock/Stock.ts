import { QuantityAvailable } from "./QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Status/Status";
import { StockId } from "./StockId/StockId";

export class Stock {
  private constructor(
    private readonly _stockId: StockId,
    private _quantityAvailable: QuantityAvailable,
    private _status: Status
  ) {}

  static create() {
    const defaultStockId = new StockId();
    const defaultquantityAvailable = new QuantityAvailable(0);
    const defaultStatus = new Status(StatusEnum.OutOfStock);
    return new Stock(defaultStockId, defaultquantityAvailable, defaultStatus)
  }

  public delete() {
    if(this.status.value != StatusEnum.OutOfStock) {
      throw new Error('在庫がある場合削除できません。')
    }
  }

  increaseQuantity(amount: number) {
    if(amount < 0) {
      throw new Error('増加量は0以上でなければなりません。')
    }

    const newQuantity = this.quantityAvailable.increment(amount).value;

    if(newQuantity <= 10) {
      this.changeStatus(new Status(StatusEnum.LowStock))
      // この時0ならステータスは在庫なしになるのでは？
    }

    this._quantityAvailable = new QuantityAvailable(newQuantity)
  }

  decreaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('減少量は0以上でなければなりません。');
    }

    const newQuantity = this.quantityAvailable.value - amount;
    if (newQuantity < 0) {
      throw new Error('減少後の在庫数が0未満になってしまいます。');
    }

    // 在庫数が0になったらステータスを在庫切れにする
    if (newQuantity === 0) {
      this.changeStatus(new Status(StatusEnum.OutOfStock));
    } else if(newQuantity <= 10) { // 在庫数が10以下ならステータスを残りわずかにする
      this.changeStatus(new Status(StatusEnum.LowStock));
    }

    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }


  public changeStatus(status: Status) {
    this._status = status;
  }

  static reconstruct(
    stockId: StockId,
    quantityAvailable: QuantityAvailable,
    status: Status
  ) {
    return new Stock(stockId, quantityAvailable, status)
  }

  get stockId(): StockId {
    return this._stockId;
  }

  get quantityAvailable(): QuantityAvailable {
    return this._quantityAvailable;
  }

  get status(): Status {
    return this._status;
  }
}