import { QuantityAvailable } from "./QuantityAvailable";

describe("QuantityAvailable", () => {
  test('許容範囲内の在庫数を設定できる', () => {
    const validQuantityAvailable = 500;
    const quantity = new QuantityAvailable(validQuantityAvailable);
    expect(quantity.value).toBe(validQuantityAvailable);
  })

  test('MIN未満の場合エラーを投げる', () => {
    const validQuantityAvailable = QuantityAvailable.MIN - 1;
    expect(() => new QuantityAvailable(validQuantityAvailable)).toThrow(
      `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
    )
  })

  test('MAXより大きい場合エラーを投げる', () => {
    const validQuantityAvailable = QuantityAvailable.MAX + 1;
    expect(() => new QuantityAvailable(validQuantityAvailable)).toThrow(
      `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
    )
  })

  describe("increment", () => {
    test('正の数を加算すると、在庫数が増加する', () => {
      const initQuantity = new QuantityAvailable(10);
      const newQuantity = initQuantity.increment(5);
      expect(newQuantity.value).toBe(15)
    })

    test('正の数を加算し、在庫数がMAXを超えるとエラーが発生する', () => {
      const initQuantity = new QuantityAvailable(QuantityAvailable.MAX);
      expect(() => initQuantity.increment(1)).toThrow(
        `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
      )
    })
  });

  describe("decrement", () => {
    test('正の数を減算すると、在庫数が減少する', () => {
      const initQuantity = new QuantityAvailable(10);
      const newQuantity = initQuantity.decrement(5);
      expect(newQuantity.value).toBe(5)
    })

    test('正の数を減算し、在庫数がMINを下回るとエラーが発生する', () => {
      const initQuantity = new QuantityAvailable(QuantityAvailable.MIN);
      expect(() => initQuantity.increment(-1)).toThrow(
        `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
      )
    })
  });
});
