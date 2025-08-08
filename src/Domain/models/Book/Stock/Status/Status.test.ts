import { Status, StatusEnum } from "./Status";

describe('Status', () => {
  it('有効なステータスでインスタンスが生成できること', () => {
    expect(new Status(StatusEnum.InStock).value).toBe(StatusEnum.InStock)
    expect(new Status(StatusEnum.LowStock).value).toBe(StatusEnum.LowStock)
    expect(new Status(StatusEnum.OutOfStock).value).toBe(StatusEnum.OutOfStock)
  })

  it('無効なステータスでエラーが投げられること', () => {
    const invalidStatusEnum = 'Invalid' as StatusEnum;
    expect(() => new Status(invalidStatusEnum)).toThrow('無効なステータスです。')
  })

  describe("toLabel", () => {
    it('ステータスInStockが「在庫あり」に変換されること', () => {
      expect(new Status(StatusEnum.InStock).toLabel()).toBe('在庫あり')
    })

    it('ステータスLowStockが「残りわずか」に変換されること', () => {
      expect(new Status(StatusEnum.LowStock).toLabel()).toBe('残りわずか')
    })

    it('ステータスOutOfStockが「在庫切れ」に変換されること', () => {
      expect(new Status(StatusEnum.OutOfStock).toLabel()).toBe('在庫切れ')
    })
  });
  
})