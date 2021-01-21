import { Levering } from "./levering.model";

export class Product {
    constructor(
        public productID: number,
        public naam: string,
        public leveringID: number,
        public levering: Levering
    ){}
}
