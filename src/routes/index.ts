// routes/index.ts
import { Router } from "express";
import { authorListApi } from "../apis/author";
import { indexApi, bookListApi } from "../apis/book";
import { bookInstanceListApi } from "../apis/bookInstance";
import { genreListApi } from "../apis/genre";

const router = Router();

router.get("/", indexApi);
router.get("/authors", authorListApi);
router.get("/books", bookListApi);
router.get("/book-instances", bookInstanceListApi);
router.get("/genres", genreListApi);

export default router;
