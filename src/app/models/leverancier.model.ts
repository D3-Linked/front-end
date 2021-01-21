import {Bedrijf} from '../models/bedrijf.model';

export class Leverancier {
    constructor(
        public leverancierID: number,
        public code: number,
        public bedrijfID: number,
        public bedrijf:Bedrijf
    ){}
}
