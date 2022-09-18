// utils/types.ts
import type { Author, Book, BookInstance, Genre } from "@prisma/client";

export interface IndexApiData {
  bookCount: number;
  bookInstanceCount: number;
  bookInstanceAvailableCount: number;
  authorCount: number;
  genreCount: number;
}

export interface AuthorListApiData {
  authorList: Author[];
}

export interface AuthorDetailApiData {
  author: Author;
  authorsBooks: Pick<Book, "id" | "title" | "summary">[];
}

export interface BookListApiData {
  bookList: (Pick<Book, "id" | "title"> & { author: Author })[];
}

export interface BookDetailApiData {
  book: Book & { author: Author; genres: Genre[] };
  bookInstances: BookInstance[];
}

export interface BookInstanceListApiData {
  bookInstanceList: (BookInstance & { book: Book })[];
}

export interface BookInstanceDetailApiData {
  bookInstance: BookInstance & { book: Book };
}

export interface GenreListApiData {
  genreList: Genre[];
}

export interface GenreDetailApiData {
  genre: Genre;
  genreBooks: Book[];
}
