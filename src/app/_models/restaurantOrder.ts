import { DishOrder } from "./DishOrder";

export class restaurantOrder{
    restaurantId: string;
    items: DishOrder[];
    constructor(restaurantId:string){
        this.restaurantId = restaurantId;
        this.items = [];
    }
}