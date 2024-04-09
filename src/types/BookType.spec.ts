import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { BookType, handleGetAuthorById } from './BookType'
import { describe, expect, it, jest } from '@jest/globals'
import { AuthorType } from './AuthorType'
import * as BookService from '../services/BookService'
import { Author } from '../models/Author'
import { Book } from '../models/Book'

describe(BookType.name, () => {
  it('should create the book type', () => {
    const subject = BookType
    expect(subject).toMatchObject({
      name: 'book',
      description: 'A book',
    } as Partial<GraphQLObjectType>)

    const expectedFields = subject.getFields()

    expect(expectedFields).toMatchObject({
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: AuthorType, resolve: handleGetAuthorById },
    })
  })

  it('should call the ge author by id when handleGetAuthorById is called', async () => {
    const authorId = 'sd82'
    const expectedResult: Author = { id: authorId, name: 'Testing' }
    const parentBook: Book = { id: '', title: '', authorId: authorId } as Book

    const getAuthorByIdSpy = jest.spyOn(BookService, 'getAuthorById')
    getAuthorByIdSpy.mockResolvedValueOnce(expectedResult)

    const result = await handleGetAuthorById(parentBook)

    expect(result).toBe(expectedResult)
    expect(getAuthorByIdSpy).toHaveBeenCalledWith(authorId)
  })
})
