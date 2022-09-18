// apis/author.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";
import type { AuthorListApiData, AuthorDetailApiData } from "../utils/types";

export const authorListApi = async (req: Request, res: Response) => {
  const authorList = await prisma.author.findMany({
    orderBy: { familyName: "asc" },
  });
  // HTTP 200: return author list sorted by family name
  const data: AuthorListApiData = { authorList };
  return res.json(data);
};

export const authorDetailApi = async (req: Request, res: Response) => {
  const [author, authorsBooks] = await Promise.all([
    prisma.author.findUnique({ where: { id: req.params.id } }),
    prisma.book.findMany({
      select: { id: true, title: true, summary: true },
      where: { authorId: req.params.id },
    }),
  ]);
  if (author === null) {
    // HTTP 404: author not found
    return res.status(404).json("Author not found");
  }
  // HTTP 200: return author and all her/his books
  const data: AuthorDetailApiData = { author, authorsBooks };
  return res.json(data);
};
