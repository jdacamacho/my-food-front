import { Ingredient } from "./ingredient";

export class Dish {
    id_dish!: string;
    name!: string;
    ingredients!: Ingredient[];
    price!: number;
}
