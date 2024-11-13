// src/api/productsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const THREE_DAYS = 259200
const THIRTY_DAYS = 2592000

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page = 1,
        search = '',
        sortBy = 'auto',
        brand = '',
        category = '',
        chunk = 12,
        searchTerm = '',
        minPrice = 50,
        maxPrice = 3500,
      }) =>
        `products?page=${page}&search=${search}&sortBy=${sortBy}&brand=${brand}&category=${category}&chunk=${chunk}&searchTerm=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      keepUnusedDataFor: THREE_DAYS,
    }),
    getHomeProducts: builder.query({
      query: () => `products?chunk=9`,
      keepUnusedDataFor: THIRTY_DAYS,
    }),
    getProduct: builder.query({
      query: (id) => {
        console.log(id)
        return `products/${id}`
      },
      keepUnusedDataFor: THREE_DAYS,
    }),
    getSimilar: builder.query({
      query: ({ id, cat }) => `products/similar/${id}?cat=${cat}`,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetHomeProductsQuery,
  useGetProductQuery,
  useGetSimilarQuery,
} = productsApi
