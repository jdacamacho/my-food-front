import { Dish } from "./dish";
import { OrderDate } from "./order-date";
import { OrderState } from "./order-state";
import { TotalPrice } from "./total-price";

export class Order {
    id_order!: string;
    date!: OrderDate;
    state!: OrderState;
    dishes!: Dish[];
    totalPrice!: TotalPrice;
}
