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
