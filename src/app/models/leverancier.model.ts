import {Bedrijf} from '../models/bedrijf.model';

export class Leverancier {
    constructor(
        public leverancierID: number,
        public code: number,
        public nummerplaat: string,
        public bedrijfID: number,
        public bedrijf:Bedrijf
    ){}
}
