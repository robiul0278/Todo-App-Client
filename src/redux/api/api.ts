import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-app-server-eta.vercel.app'}),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => ({
        url: `/tasks`,
        method: "GET",
        params: {priority}
      }),
      providesTags: ['todo']
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"]
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        console.log(options);
        return {
          url: `/task/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["todo"]
    }),
    
    removeTodo: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"]
    })
  }),
});


export const {useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useRemoveTodoMutation} = baseApi;