import { IFavKitten, IKitten } from './../models/Kitten';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface IData {
  limit: number
  page: number
}

interface IPushFavourite {
  image_id: string
  sub_id?: string
}

interface IPushFavouriteRes {
  message: string 
  id: string | number
}

const api_key = "d8018d46-8bec-4a56-96c1-054e2ea082d2"

export const kittenAPI = createApi({
  reducerPath: 'kittenAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.thecatapi.com/v1` }),
  tagTypes: ['kitten'],
  endpoints: (build) => ({
    getKittens: build.query<IKitten[], IData>({
      query: ({ limit, page }) => ({
        url: `/images/search`,
        headers: {
          "X-Api-Key": api_key,
        },
        params: {
          limit: limit,
          page: page
        },
      }),
      providesTags: (result) => ['kitten'],
    }),
    pushFavourite: build.mutation<IPushFavouriteRes, IPushFavourite>({
      query: (body) => ({
        url: `/favourites`,
        method: "POST",
        headers: {
          "X-Api-Key": api_key,
        },
        body: body,
      }),
      invalidatesTags: ['kitten'],
    }),
    delFavourite: build.mutation<IPushFavouriteRes, string>({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
        headers: {
          "X-Api-Key": api_key,
        },
      }),
      invalidatesTags: ['kitten'],
    }),
    getFavourites: build.query<IFavKitten[], any>({
      query: () => ({
        url: `/favourites`,
        headers: {
          "X-Api-Key": api_key,
        },
        params: {
          order: 'asc'
        }
      }),
      providesTags: (result) => ['kitten'],
    }),
  }),

})
