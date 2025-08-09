import { Stock } from './Stock';
import { QuantityAvailable } from './QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from './Status/Status';
import { StockId } from './StockId/StockId';

jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength'
}))

describe("Stock", () => {
  const stockId = new StockId('abc');
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);

  describe("create", () => {
    it('デフォルト値で在庫を生成する', () => {
      const stock = Stock.create();
      expect(stock.stockId.equals(new StockId('testIdWithExactLength'))).toBe(true);
      expect(stock.quantityAvailable.equals(new QuantityAvailable(0))).toBe(true);
      expect(stock.status.equals(new Status(StatusEnum.OutOfStock))).toBe(true);
    })
  });

  describe("delete", () => {
    it('在庫ありの場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      expect(() => stock.delete()).toThrow('在庫がある場合削除できません。')
    })

    it('在庫無しの場合はエラーを投げない', () => {
      const status = new Status(StatusEnum.OutOfStock);
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      expect(() => stock.delete()).not.toThrow();
    })
  });
  
  describe("increateQuantity", () => {
    it('在庫数をふやす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      stock.increaseQuantity(10)
      expect(stock.quantityAvailable.equals(new QuantityAvailable(110))).toBe(true);
    })

    it('増加量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      expect(() => stock.increaseQuantity(-1)).toThrow('増加量は0以上でなければなりません。')
    })
  });
  
  describe("decreaseQuantity", () => {
    it('在庫数を減らす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      stock.decreaseQuantity(10)
      expect(stock.quantityAvailable.equals(new QuantityAvailable(90))).toBe(true);
    })

     it('減少量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      expect(() => stock.decreaseQuantity(-1)).toThrow('減少量は0以上でなければなりません。');
    })

    it('減少後の在庫数が0未満の場合エラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      expect(() => stock.decreaseQuantity(101)).toThrow('減少後の在庫数が0未満になってしまいます。');
    })

    it('減少後の在庫数が10以下ならステータスを残りわずかにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      stock.decreaseQuantity(90);
      expect(stock.quantityAvailable.equals(new QuantityAvailable(10))).toBe(true);
      expect(stock.status.equals(new Status(StatusEnum.LowStock))).toBe(true);
    })

    it('減少後の在庫数が0ならステータスを在庫切れにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status)
      stock.decreaseQuantity(100);
      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBe(true);
      expect(stock.status.equals(new Status(StatusEnum.OutOfStock))).toBe(true);
    })
  });
});
