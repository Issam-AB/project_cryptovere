import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "crypto",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // ** The `getCryptos` endpoint is a "query" operation that returns data
    getCryptos: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd',
//     params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
//     headers: {
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//       'X-RapidAPI-Key': 'a3f6f3bb45msh9b8e47145fcd656p15df42jsn64fd40ed4df9'
//     }
//   };
