export class Schedule {
    constructor(
        public scheduleID: number,
        public code: number,
        public datum: Date,
        public opmerking: string,
        public userID: number
    ){}
}
