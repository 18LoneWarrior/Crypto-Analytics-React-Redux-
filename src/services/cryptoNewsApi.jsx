import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoNewsHeaders =  {
        'X-RapidAPI-Key':import.meta.env. VITE_REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host':import.meta.env.VITE_REACT_APP_NEWS_RAPIDAPI_HOST
}

const baseUrl = import.meta.env.VITE_REACT_APP_NEWS_API_URL

const createRequest = (url) => ({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (count) => createRequest(`news?limit=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi