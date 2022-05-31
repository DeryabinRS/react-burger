import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { io } from "socket.io-client";


export const wsApi = createApi({
    reducerPath: 'ordersWss',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: build => ({
        getOrdersAll: build.query<any, string>({
			query: (accessToken) => `/orders?token=${accessToken}`,
			async onCacheEntryAdded(_arg, { dispatch, updateCachedData, cacheEntryRemoved}){
				const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${_arg}`)
				console.log(_arg)
				console.log(ws)
				try {
					await updateCachedData
					const listener = (event:any) => {
					  const data = JSON.parse(event.data)
		  
					  updateCachedData((draft) => {
						draft.push(data)
					  })
					}
		  
					ws.addEventListener('message', listener)
				  } catch {
					// no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
					// in which case `cacheDataLoaded` will throw
				  }
				  // cacheEntryRemoved will resolve when the cache subscription is no longer active
				  await cacheEntryRemoved
			}
		})
    })
})

// type initialStateType = {
//     wsConnected: boolean,
//     messages: []
// }

// const initialState:initialStateType = {
//     wsConnected: false,
//     messages: []
// }

// export const wsOrdersSlice = createSlice({
//     name: 'ingredients',
//     initialState: initialState,
//     reducers:{
//         //ORDER API
//         wsConnectionSuccess(state, action){
//             state.wsConnected = true
//         },
//         wsConnectionError(state){
//             state.wsConnected = false
//         },
//         wsConnectionClosed(state, action: PayloadAction<string>){
//             state.wsConnected = false
//         },
//         wsGetMessage(state, action: PayloadAction<any>){
//             state.messages = action.payload
//         }
//     }
// })

// // export const { 
// //     wsConnectionSuccess,
// // } = wsOrdersSlice.actions

// export default wsOrdersSlice.reducer;