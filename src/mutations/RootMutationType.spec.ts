import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { RootMutationType, handleAddBook } from "./RootMutationType";
import { BookType } from "../types/BookType";
import { GraphQLNonNull, GraphQLString } from "graphql";
import * as BookService from "../services/BookService";
import { Book } from "../models/Book";

describe(RootMutationType.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create the object type successfully", () => {
    const subject = RootMutationType;

    expect(subject.name).toBe("Mutation");
    expect(subject.description).toBe("Root Mutation");

    const fields = subject.toConfig().fields;

    expect(fields).toMatchObject({
      addBook: {
        type: BookType,
        description: "Adds a book",
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          authorId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: handleAddBook,
      },
    });
  });

  it("should call addBook", async () => {
    const addBookSpy = jest.spyOn(BookService, "addBook");
    const request = { title: "My new book", authorId: "sd9f" };

    const expectedBook: Book = {
      title: request.title,
      authorId: request.authorId,
      id: "8923asd",
    };

    addBookSpy.mockResolvedValue(expectedBook);

    const result = await handleAddBook(undefined, request);

    expect(addBookSpy).toHaveBeenCalledWith({ ...request });
    expect(result).toBe(expectedBook);
  });
});
