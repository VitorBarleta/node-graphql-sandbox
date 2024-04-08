import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Book } from "../models/Book";
import {
  addAuthor,
  addBook,
  getAuthorById,
  getAuthors,
  getBooks,
  getBooksByAuthorId,
} from "./BookService";
import { Author } from "../models/Author";

const baseUrl = "http://localhost:3000";

describe("BookService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return successfully when getBooks is called", async () => {
    const authorId = "ak38";

    const expectedBooks: Book[] = [
      { id: "sdf9", title: "My fake book", authorId: authorId },
    ];
    const getSpy = jest.spyOn(axios, "get");

    getSpy.mockResolvedValueOnce({ data: expectedBooks } as AxiosResponse<
      Book[],
      any
    >);

    const result = await getBooks();

    expect(result).toBe(expectedBooks);
    expect(getSpy).toHaveBeenCalledWith(`${baseUrl}/books`);
  });

  it("should return an empty array when getBooks returns an error", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn");
    const getSpy = jest.spyOn(axios, "get");

    const expectedError = new AxiosError();

    getSpy.mockRejectedValueOnce(expectedError);

    const result = await getBooks();

    expect(result).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });

  it("should return successfully when getAuthors is called", async () => {
    const getSpy = jest.spyOn(axios, "get");
    const expectedResult: Author[] = [
      { id: "asdf8", name: "some fake author" },
    ];

    getSpy.mockResolvedValueOnce({ data: expectedResult });

    const result = await getAuthors();

    expect(result).toBe(expectedResult);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(`${baseUrl}/authors`);
  });

  it("should return an empty array when getAuthors returns an error", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn");
    const getSpy = jest.spyOn(axios, "get");

    const expectedError = new AxiosError();

    getSpy.mockRejectedValueOnce(expectedError);

    const result = await getAuthors();

    expect(result).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });

  it("should return successfully when getAuthorById is called", async () => {
    const getSpy = jest.spyOn(axios, "get");
    const authorId = "s8df";
    const expectedResult: Author = {
      id: authorId,
      name: "Another Fake Onde",
    };

    getSpy.mockResolvedValueOnce({ data: expectedResult });

    const result = await getAuthorById(authorId);

    expect(result).toBe(expectedResult);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(`${baseUrl}/authors/${authorId}`);
  });

  it("should return an empty object when getAuthorById returns an error", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn");
    const getSpy = jest.spyOn(axios, "get");
    const authorId = "38df";
    const expectedError = new AxiosError();

    getSpy.mockRejectedValueOnce(expectedError);

    const result = await getAuthorById(authorId);

    expect(result).toEqual({});
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });

  it("should return successfully when getBooksByAuthorId is called", async () => {
    const getSpy = jest.spyOn(axios, "get");
    const authorId = "sdh12";
    const expectedResult: Book[] = [
      {
        id: authorId,
        title: "This is a fake book",
        authorId: authorId,
      },
    ];

    getSpy.mockResolvedValueOnce({ data: expectedResult });

    const result = await getBooksByAuthorId(authorId);

    expect(result).toBe(expectedResult);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(
      `${baseUrl}/books?authorId=${authorId}`
    );
  });

  it("should return an empty array when getBooksByauthorId returns an error", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn");
    const getSpy = jest.spyOn(axios, "get");
    const authorId = "s9df";
    const expectedError = new AxiosError();

    getSpy.mockRejectedValueOnce(expectedError);

    const result = await getBooksByAuthorId(authorId);

    expect(result).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });

  it("should return a book when the addBook is called", async () => {
    const postSpy = jest.spyOn(axios, "post");
    const expectedResult: Book = {
      authorId: "sd8f",
      id: "783r",
      title: "I'm tired of this",
    };

    postSpy.mockResolvedValueOnce({ data: expectedResult });

    const bookToCreate: Partial<Book> = {
      title: expectedResult.title,
      authorId: expectedResult.authorId,
    };

    const result = await addBook(bookToCreate);

    expect(result).toBe(expectedResult);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(`${baseUrl}/books`, bookToCreate);
  });

  it("should return an empty object when the addBook returns an error", async () => {
    const postSpy = jest.spyOn(axios, "post");
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const expectedError = new AxiosError();

    postSpy.mockRejectedValueOnce(expectedError);

    const result = await addBook({});

    expect(result).toEqual({});
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });

  it('should call authors post endpoint and return the author created when success', async () => {
    const postSpy = jest.spyOn(axios, "post");
    const authorName = "Robert C. Martin"
    const expectedResult: Author = {
      id: "asdf89",
      name: authorName
    };

    postSpy.mockResolvedValueOnce({ data: expectedResult });

    const authorToCreate: Partial<Author> = {
      name: authorName
    };

    const result = await addAuthor(authorToCreate);

    expect(result).toBe(expectedResult);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(`${baseUrl}/authors`, authorToCreate);
  });

  it("should return an empty object when the addAuthor returns an error", async () => {
    const postSpy = jest.spyOn(axios, "post");
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    const expectedError = new AxiosError();

    postSpy.mockRejectedValueOnce(expectedError);

    const result = await addAuthor({});

    expect(result).toEqual({});
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedError);
  });
});
