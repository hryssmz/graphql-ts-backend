// apis/bookInstance.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const bookInstanceListApi = async (req: Request, res: Response) => {
  const bookInstanceList = await prisma.bookInstance.findMany({
    include: { book: true },
  });
  // HTTP 200: return book copy list
  return res.json({ bookInstanceList });
};
