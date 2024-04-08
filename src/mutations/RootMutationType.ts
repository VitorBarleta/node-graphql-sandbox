import {
  GraphQLArgumentConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BookType } from "../types/BookType";
import { Book } from "../models/Book";
import { addBook } from "../services/BookService";

type CreateBookRequest = { title: string; authorId: string };

const AddBookArgs: {
  [key in keyof CreateBookRequest]: GraphQLArgumentConfig;
} & GraphQLFieldConfigArgumentMap = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  authorId: { type: new GraphQLNonNull(GraphQLString) },
};

export const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Adds a book",
      args: AddBookArgs,
      resolve: handleAddBook,
    },
  }),
});

export async function handleAddBook(_: unknown, request: CreateBookRequest): Promise<Book> {
  const newBook: Partial<Book> = {
      title: request.title,
      authorId: request.authorId,
  };
  return addBook(newBook);
}