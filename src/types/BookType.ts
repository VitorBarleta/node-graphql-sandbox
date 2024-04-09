import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { AuthorType } from './AuthorType'
import { Book } from '../models/Book'
import { getAuthorById } from '../services/BookService'

const makeBookType = (): GraphQLObjectType =>
  new GraphQLObjectType({
    name: 'book',
    description: 'A book',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: AuthorType, resolve: handleGetAuthorById },
    }),
  })

export const BookType = makeBookType()

export const handleGetAuthorById = async (source: Book) =>
  getAuthorById(source.authorId)
