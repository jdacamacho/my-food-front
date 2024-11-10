import { Dish } from "./dish";
import { MenuDate } from "./menu-date";


export class Menu {
    id_order!: string;
    date!: MenuDate;
    dishes!: Dish[];
  
}
