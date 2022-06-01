import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrderResponse } from "../../../types/orders-types";

export const wsApi = createApi({
  reducerPath: "webSocketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getOrders: build.query<IOrderResponse, string>({
      queryFn: () => ({
        data: { success: false, orders: [], total: 0, totalToday: 0 },
      }),
      async onCacheEntryAdded(
        url,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(url);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data:IOrderResponse = JSON.parse(event.data);
            updateCachedData(() => data);
          };

          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery } = wsApi;