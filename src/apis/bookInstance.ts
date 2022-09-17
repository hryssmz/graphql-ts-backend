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

export const bookInstanceDetailApi = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bookInstance = await prisma.bookInstance.findUnique({
    where: { id },
    include: { book: true },
  });
  // HTTP 200: return book copy
  return res.json({ bookInstance });
};
