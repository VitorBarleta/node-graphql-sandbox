import {
  GraphQLArgumentConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import { BookType } from '../types/BookType'
import { Book } from '../models/Book'
import { addAuthor, addBook } from '../services/BookService'
import { AuthorType } from '../types/AuthorType'
import { Author } from '../models/Author'

type CreateBookRequest = { title: string; authorId: string }

type CreateAuthorRequest = { name: string }

const AddBookArgs: {
  [key in keyof CreateBookRequest]: GraphQLArgumentConfig
} & GraphQLFieldConfigArgumentMap = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  authorId: { type: new GraphQLNonNull(GraphQLString) },
}

const AddAuthorArgs: {
  [key in keyof CreateAuthorRequest]: GraphQLArgumentConfig
} & GraphQLFieldConfigArgumentMap = {
  name: { type: new GraphQLNonNull(GraphQLString) },
}

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Adds a book',
      args: AddBookArgs,
      resolve: handleAddBook,
    },
    addAuthor: {
      type: AuthorType,
      description: 'Adds an Author',
      args: AddAuthorArgs,
      resolve: handleAddAuthor,
    },
  }),
})

export async function handleAddBook(
  _: unknown,
  request: CreateBookRequest,
): Promise<Book> {
  const newBook: Partial<Book> = {
    title: request.title,
    authorId: request.authorId,
  }
  return addBook(newBook)
}

export async function handleAddAuthor(
  _: unknown,
  request: CreateAuthorRequest,
): Promise<Author> {
  const newAuthor: Partial<Author> = {
    name: request.name,
  }
  return addAuthor(newAuthor)
}
