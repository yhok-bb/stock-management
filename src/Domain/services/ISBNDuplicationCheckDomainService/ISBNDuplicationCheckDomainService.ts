import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export class ISBNDuplicationCheckDomainService {
  constructor(private bookRepositoty: IBookRepository) {};

  async execute(isbn: BookId): Promise<boolean> {
    const duplicateISBNBook = await this.bookRepositoty.find(isbn)
    const isDuplicateISBN = !!duplicateISBNBook;

    return isDuplicateISBN;
  }
}