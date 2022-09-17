// apis/author.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const authorListApi = async (req: Request, res: Response) => {
  const authorList = await prisma.author.findMany({
    orderBy: { familyName: "asc" },
  });
  // HTTP 200: return author list sorted by family name
  return res.json({ authorList });
};

export const authorDetailApi = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [author, authorsBooks] = await Promise.all([
    prisma.author.findUnique({ where: { id } }),
    prisma.book.findMany({
      select: { id: true, title: true, summary: true },
      where: { authorId: id },
    }),
  ]);
  // HTTP 200: return author and all her/his books
  return res.json({ author, authorsBooks });
};
