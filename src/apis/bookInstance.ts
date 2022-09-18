// apis/bookInstance.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";
import type {
  BookInstanceListApiData,
  BookInstanceDetailApiData,
} from "../utils/types";

export const bookInstanceListApi = async (req: Request, res: Response) => {
  const bookInstanceList = await prisma.bookInstance.findMany({
    include: { book: true },
  });
  // HTTP 200: return book copy list
  const data: BookInstanceListApiData = { bookInstanceList };
  return res.json(data);
};

export const bookInstanceDetailApi = async (req: Request, res: Response) => {
  const bookInstance = await prisma.bookInstance.findUnique({
    where: { id: req.params.id },
    include: { book: true },
  });
  if (bookInstance === null) {
    // HTTP 404: book copy not found
    return res.status(404).json("Book copy not found");
  }
  // HTTP 200: return book copy
  const data: BookInstanceDetailApiData = { bookInstance };
  return res.json(data);
};
