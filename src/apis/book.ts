// apis/book.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";
import type {
  IndexApiData,
  BookListApiData,
  BookDetailApiData,
} from "../utils/types";

export const indexApi = async (req: Request, res: Response) => {
  const [
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    authorCount,
    genreCount,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.bookInstance.count(),
    prisma.bookInstance.count({ where: { status: { equals: "Available" } } }),
    prisma.author.count(),
    prisma.genre.count(),
  ]);
  // HTTP 200: return number of each record in the library
  const data: IndexApiData = {
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    authorCount,
    genreCount,
  };
  return res.json(data);
};

export const bookListApi = async (req: Request, res: Response) => {
  const bookList = await prisma.book.findMany({
    select: { id: true, title: true, author: true },
    orderBy: { title: "asc" },
  });
  // HTTP 200: return book list sorted by title
  const data: BookListApiData = { bookList };
  return res.json(data);
};

export const bookDetailApi = async (req: Request, res: Response) => {
  const [book, bookInstances] = await Promise.all([
    prisma.book.findUnique({
      where: { id: req.params.id },
      include: { author: true, genres: true },
    }),
    prisma.bookInstance.findMany({ where: { bookId: req.params.id } }),
  ]);
  if (book === null) {
    // HTTP 404: book not found
    return res.status(404).json("Book not found");
  }
  // HTTP 200: return book and all its copies
  const data: BookDetailApiData = { book, bookInstances };
  return res.json(data);
};
