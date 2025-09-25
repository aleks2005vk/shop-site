import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildUrl } from '../../utils/common';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      // тут если передаёшь params, он добавит ?key=value
      query: (params = {}) => buildUrl('products', params),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
