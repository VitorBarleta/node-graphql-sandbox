import { GraphQLObjectType, GraphQLList } from 'graphql'

import { BookType } from '../types/BookType'
import { getBooks, getAuthors } from '../services/BookService'
import { AuthorType } from '../types/AuthorType'
import { Book } from '../models/Book'
import { Author } from '../models/Author'

export const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: handleGetBooks,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: handleGetAuthors,
    },
  }),
})

export const handleGetBooks = async (): Promise<Book[]> => await getBooks()

export const handleGetAuthors = async (): Promise<Author[]> =>
  await getAuthors()
