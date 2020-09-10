import Book from '@modules/books/infra/typeorm/entities/Book';

export default interface IBooksRepository {
  findAllBooks(): Promise<Book[]>
  findMatchingBooks(books_id: string[]): Promise<Book[] | undefined>
}