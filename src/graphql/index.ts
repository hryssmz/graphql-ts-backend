// graphql/index.ts
import { gql } from "apollo-server-core";
import prisma from "../utils/prisma";

export const typeDefs = gql`
  type Author {
    id: Int!
    firstName: String!
    familyName: String!
  }

  type Book {
    id: Int!
    title: String!
    author: Author!
    summary: String!
    isbn: String!
    genres: [Genre!]!
  }

  type BookInstance {
    id: Int!
    book: Book!
    imprint: String!
    status: String
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Query {
    authors: [Author!]!
    books: [Book!]!
    bookInstances: [BookInstance!]!
    genres: [Genre!]!
  }
`;

export const resolvers = {
  Query: {
    authors: async () => {
      const authors = await prisma.author.findMany();
      return authors;
    },
    books: async () => {
      const books = await prisma.book.findMany({
        include: { author: true, genres: true },
      });
      return books;
    },
    bookInstances: async () => {
      const bookInstances = await prisma.bookInstance.findMany({
        include: { book: { include: { author: true, genres: true } } },
      });
      return bookInstances;
    },
    genres: async () => {
      const genres = await prisma.genre.findMany();
      return genres;
    },
  },
};
