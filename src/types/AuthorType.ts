import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BookType } from "./BookType";
import { Author } from "../models/Author";
import { getBooksByAuthorId } from "../services/BookService";

const makeAuthorType = (): GraphQLObjectType =>
  new GraphQLObjectType({
    name: "author",
    description: "An Author",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      books: {
        type: new GraphQLList(BookType),
        resolve: handleGetBooksByAuthorId,
      },
    }),
  });

export const AuthorType = makeAuthorType();

export const handleGetBooksByAuthorId = async (source: Author) =>
  await getBooksByAuthorId(source.id);
