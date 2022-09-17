import { gql } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import prisma from "../utils/prisma";
import type { Server } from "http";

const typeDefs = gql`
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

const resolvers = {
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

export async function startApolloServer(httpServer: Server) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  return server;
}
