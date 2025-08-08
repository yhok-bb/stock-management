import { Price } from "./Price";

describe("Price", () => {
  it('有効なフォーマットの場合', () => {
    const amount = 1000
    const currency = 'JPY'
    const price = new Price({ amount: amount, currency: currency })
    expect(price.amount).toBe(amount)
    expect(price.currency).toBe(currency)
  })

  it('無効な通貨コードの場合エラーを投げる', () => {
    const invalidCurrency = 'USD';
    expect(() => {
      // @ts-expect-error テストのために無効な値を渡す
      new Price({ amount: 500, currency: invalidCurrency });
    }).toThrow('現在は日本円のみを扱います。');
  });
  
  it('MIN未満の金額の場合にエラーを投げる', () => {
    const lessPrice = Price.MIN - 1;
    
    expect(() => {
      new Price({ amount: lessPrice, currency: 'JPY' })
    }).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`
    )
  })

  it('MAX超の値でPriceを生成するとエラーを投げる', () => {
    const moreThanMax = Price.MAX + 1;
    expect(() => {
      new Price({ amount: moreThanMax, currency: 'JPY' });
    }).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`
    );
  });
});
