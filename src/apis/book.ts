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
