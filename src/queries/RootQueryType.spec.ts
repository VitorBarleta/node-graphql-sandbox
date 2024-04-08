import { describe, it, expect, jest } from "@jest/globals";
import {
  RootQueryType,
  handleGetAuthors,
  handleGetBooks,
} from "./RootQueryType";
import { GraphQLList } from "graphql";
import { BookType } from "../types/BookType";
import { AuthorType } from "../types/AuthorType";
import * as BookService from "../services/BookService";
import { Book } from "../models/Book";
import { Author } from "../models/Author";

describe(RootQueryType.name, () => {
  it("should create the object type correctly", () => {
    const subject = RootQueryType;

    expect(subject.name).toBe("Query");
    expect(subject.description).toBe("Root Query");

    const fields = subject.getFields();

    expect(fields).toMatchObject({
      books: {
        type: new GraphQLList(BookType),
        resolve: handleGetBooks,
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve: handleGetAuthors,
      },
    });
  });

  it("should call getBooks when the handleGetBooks is called", async () => {
    const getBooksSpy = jest.spyOn(BookService, "getBooks");
    const expectedBooks: Book[] = [
      {
        id: "df8f",
        title: "this book is awesome",
        authorId: "This Author is insane",
      },
    ];

    getBooksSpy.mockResolvedValueOnce(expectedBooks);

    const result = await handleGetBooks();

    expect(result).toBe(expectedBooks);
    expect(getBooksSpy).toHaveBeenCalledTimes(1);
  });

  it("should call getAuthors when the handleGetAuthors is called", async () => {
    const getAuthorsSpy = jest.spyOn(BookService, "getAuthors");
    const expectedAuthors: Author[] = [
      {
        id: "sdf8g",
        name: "This Author is insane",
      },
    ];

    getAuthorsSpy.mockResolvedValueOnce(expectedAuthors);

    const result = await handleGetAuthors();

    expect(result).toBe(expectedAuthors);
    expect(getAuthorsSpy).toHaveBeenCalledTimes(1);
  });
});
