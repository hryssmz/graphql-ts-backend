// apis/genre.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const genreListApi = async (req: Request, res: Response) => {
  const genreList = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  // HTTP 200: return genre list sorted by name
  return res.json({ genreList });
};
