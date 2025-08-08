import { ValueObject } from 'Domain/models/shared/ValueObject';

type BookIdValue = string;
export class BookId extends ValueObject<BookIdValue, 'BookId'> {
  static MAX_LENGTH = 13;
  static MIN_LENGTH = 10;

  constructor(value: BookIdValue) {
    super(value)
  }

  protected validate(isbn: BookIdValue): void {
    if(isbn.length < BookId.MIN_LENGTH || isbn.length > BookId.MAX_LENGTH) {
      throw new Error('ISBNの文字数が不正です')
    }

    if(!this.isValidIsbn10(isbn) && !this.isValidIsbn13(isbn)) {
      throw new Error('不正なISBNの形式です');
    }
  }

  private isValidIsbn10(isbn: BookIdValue): boolean {
    return isbn.length === 10;
  }

  private isValidIsbn13(isbn: BookIdValue): boolean {
    return isbn.startsWith('978') && isbn.length === 13;
  }

  get value(): BookIdValue {
    return this._value;
  }

  toISBN(): BookIdValue {
    if (this._value.length === 10) {
      // ISBNが10桁の場合の、'ISBN' フォーマットに変換します。
      const groupIdentifier = this._value.substring(0, 1); // 国コードなど（1桁）
      const publisherCode = this._value.substring(1, 3); // 出版者コード（2桁）
      const bookCode = this._value.substring(3, 9); // 書籍コード（6桁）
      const checksum = this._value.substring(9); // チェックディジット（1桁）

      return `ISBN${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
    } else {
      // ISBNが13桁の場合の、'ISBN' フォーマットに変換します。
      const isbnPrefix = this._value.substring(0, 3); // 最初の3桁 (978 または 979)
      const groupIdentifier = this._value.substring(3, 4); // 国コードなど（1桁）
      const publisherCode = this._value.substring(4, 6); // 出版者コード（2桁）
      const bookCode = this._value.substring(6, 12); // 書籍コード（6桁）
      const checksum = this._value.substring(12); // チェックディジット（1桁）

      return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
    }
  }
}