import { IKitten } from './../models/Kitten';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface IData {
  limit: number
  page: number
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
  }),
})
