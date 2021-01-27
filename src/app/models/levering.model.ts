import { Laadkade } from "./laadkade.model";
import { Schedule } from "./schedule.model";
import { Leverancier } from "./leverancier.model";

export class Levering {
    constructor(
        public leveringID: number,
        public omschrijving: string,
        public laadkadeID: number,
        public scheduleID: number,
        public leverancierID: number,
        public laadkade: Laadkade,
        public schedule: Schedule,
        public leverancier: Leverancier,
        public isCompleet: boolean
    ){}
}
