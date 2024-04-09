import { describe, it, expect, jest } from '@jest/globals'
import { AuthorType, handleGetBooksByAuthorId } from './AuthorType'
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { BookType } from './BookType'
import { Author } from '../models/Author'
import * as BookService from '../services/BookService'
import { Book } from '../models/Book'

describe(AuthorType.name, () => {
  it('should create the AuthorType', () => {
    const subject = AuthorType

    expect(subject).toMatchObject({
      name: 'author',
      description: 'An Author',
    })

    const fields = subject.getFields()

    expect(fields).toMatchObject({
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      books: {
        type: new GraphQLList(BookType),
        resolve: handleGetBooksByAuthorId,
      },
    })
  })

  it('should call the getBooksByauthorId when the handleGetBooksByAuthorId is called', async () => {
    const authorId = 'jh23'
    const parentAuthor: Author = { id: authorId, name: 'Fake Author Name' }
    const getBooksByAuthorIdSpy = jest.spyOn(BookService, 'getBooksByAuthorId')

    const expectedBooks: Book[] = [
      { id: 'as34', title: 'My fake book', authorId: authorId },
    ]

    getBooksByAuthorIdSpy.mockResolvedValueOnce(expectedBooks)

    const result = await handleGetBooksByAuthorId(parentAuthor)

    expect(result).toBe(expectedBooks)

    expect(getBooksByAuthorIdSpy).toHaveBeenCalledWith(authorId)
  })
})
