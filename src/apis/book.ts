// apis/book.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

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
  return res.json({
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    authorCount,
    genreCount,
  });
};

export const bookListApi = async (req: Request, res: Response) => {
  const bookList = await prisma.book.findMany({
    select: { id: true, title: true, author: true },
    orderBy: { title: "asc" },
  });
  // HTTP 200: return book list sorted by title
  return res.json({ bookList });
};

export const bookDetailApi = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [book, bookInstances] = await Promise.all([
    prisma.book.findUnique({
      where: { id },
      include: { author: true, genres: true },
    }),
    prisma.bookInstance.findMany({ where: { bookId: id } }),
  ]);
  // HTTP 200: return book and all its copies
  return res.json({ book, bookInstances });
};
