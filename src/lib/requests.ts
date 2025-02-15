import axios, { AxiosResponse } from 'axios';
import { api } from './api';

export interface UserCredentials {
  _id?: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface RecommendCredentialsInnerData {
  _id: string;
  imageUrl: string;
  author: string;
  title: string;
  totalPages: number;
  recommend: boolean;
}

export interface RecommendCredentialsData {
  data: RecommendCredentialsInnerData;
}

export interface RecommendCredentials {
  results: Array<RecommendCredentialsData>;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface LibraryBookCredentials {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  // progress: Array<any>;
}

export interface addBookProps {
  title: string;
  author: string;
  totalPages?: number;
}

export interface recommendProps {
  title: string;
  author: string;
  page: number;
  limit: number;
}

export interface deleteResponseCred {
  message: string;
  id: string;
}

export async function getCurrent() {
  const currentUser = await api('users/current');
  return currentUser.data;
}

export async function getRecommended({
  title,
  author,
  page,
  limit,
}: recommendProps) {
  const recommend = await api('books/recommend', {
    params: {
      title,
      author,
      page,
      limit,
    },
  });

  return recommend.data;
}

export async function addBook({ title, author, totalPages }: addBookProps) {
  const book = await api.post('books/add', {
    title,
    author,
    totalPages,
  });

  return book.data;
}

export async function addBookById({ _id }: { _id: string }) {
  const book = await api.post(`books/add/${_id}`);

  return book.data;
}

export async function getOwnBook() {
  const books = await api('books/own');
  return books.data;
}

export async function delateBook({
  _id,
}: {
  _id: string;
}): Promise<deleteResponseCred> {
  const res: AxiosResponse<deleteResponseCred> = await axios.delete(
    `books/remove/${_id}`,
  );

  return res.data;
}
