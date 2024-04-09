import axios from 'axios'
import { Book } from '../models/Book'
import { Author } from '../models/Author'

const baseUrl = 'http://localhost:3000'

export async function getBooks(): Promise<Book[]> {
  return axios
    .get<Book[]>(`${baseUrl}/books`)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return []
    })
}

export async function getAuthors(): Promise<Author[]> {
  return axios
    .get<Author[]>(`${baseUrl}/authors`)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return []
    })
}

export async function getAuthorById(authorId: string): Promise<Author> {
  return axios
    .get<Author>(`${baseUrl}/authors/${authorId}`)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return {} as Author
    })
}

export async function getBooksByAuthorId(authorId: string): Promise<Book[]> {
  return axios
    .get<Book[]>(`${baseUrl}/books?authorId=${authorId}`)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return []
    })
}

export async function addBook(book: Partial<Book>): Promise<Book> {
  return axios
    .post<Book>(`${baseUrl}/books`, book)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return {} as Book
    })
}

export async function addAuthor(author: Partial<Author>): Promise<Author> {
  return axios
    .post<Author>(`${baseUrl}/authors`, author)
    .then(response => response.data)
    .catch(err => {
      console.warn(err)
      return {} as Author
    })
}
