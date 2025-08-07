import { BookId } from "./BookId";

describe("BookId", () => {
  // 正常系
  test('有効なフォーマットの場合', () => {
    expect(new BookId('9784167158057').value).toBe('9784167158057')
    expect(new BookId('9784167158').value).toBe('9784167158')
  })

  test('equals', () => {
    const BookId1 = new BookId('9784167158057')
    const BookId2 = new BookId('9784167158057')
    const BookId3 = new BookId('9784167158')

    expect(BookId1.equals(BookId2)).toBeTruthy();
    expect(BookId1.equals(BookId3)).toBeFalsy();
  })

  test('toISBN() 13桁', () => {
    const bookId = new BookId('9784167158057');
    expect(bookId.toISBN()).toBe('ISBN978-4-16-715805-7')
  })

  test('toISBN() 10桁', () => {
    const bookId = new BookId('4167158051');
    expect(bookId.toISBN()).toBe('ISBN4-16-715805-1');
  });

  // 異常系
  test('不正な文字数の場合にエラーを投げる', () => {
    // 境界値のテスト
    expect(() => new BookId('1'.repeat(101))).toThrow('ISBNの文字数が不正です');
    expect(() => new BookId('1'.repeat(9))).toThrow('ISBNの文字数が不正です');
  });

  test('不正なフォーマットの場合にエラーを投げる', () => {
    expect(() => new BookId('9994167158057')).toThrow('不正なISBNの形式です');
  });
});
