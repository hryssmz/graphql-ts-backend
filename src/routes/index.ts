// routes/index.ts
import { Router } from "express";
import { authorListApi, authorDetailApi } from "../apis/author";
import { indexApi, bookListApi, bookDetailApi } from "../apis/book";
import {
  bookInstanceListApi,
  bookInstanceDetailApi,
} from "../apis/bookInstance";
import { genreListApi, genreDetailApi } from "../apis/genre";

const router = Router();

router.get("/", indexApi);

router.get("/authors", authorListApi);
router.get("/author/:id", authorDetailApi);

router.get("/books", bookListApi);
router.get("/book/:id", bookDetailApi);

router.get("/book-instances", bookInstanceListApi);
router.get("/book-instance/:id", bookInstanceDetailApi);

router.get("/genres", genreListApi);
router.get("/genre/:id", genreDetailApi);

export default router;
