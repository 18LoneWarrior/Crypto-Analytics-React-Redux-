import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_CRYPTO_RAPIDAPI_HOST
}

const baseUrl =  import.meta.env.VITE_REACT_APP_CRYPTO_API_URL

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest (`coin/${coinId}/history?timePeriod=${timePeriod}`),
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi
