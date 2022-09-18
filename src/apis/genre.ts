// apis/genre.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const genreListApi = async (req: Request, res: Response) => {
  const genreList = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  // HTTP 200: return genre list sorted by name
  return res.json({ genreList });
};

export const genreDetailApi = async (req: Request, res: Response) => {
  const [genre, genreBooks] = await Promise.all([
    prisma.genre.findUnique({ where: { id: req.params.id } }),
    prisma.book.findMany({
      where: { genres: { some: { id: req.params.id } } },
    }),
  ]);
  // HTTP 200: return genre and all related books
  return res.json({ genre, genreBooks });
};
