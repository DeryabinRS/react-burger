export interface IOrder {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string
}
export interface IOrderResponse {
    success: boolean;
    orders: IOrder[],
    total: number,
    totalToday: number
} 