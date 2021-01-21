import { Role } from "./role.model";

export class User {
    constructor(
        public userID: number,
        public naam: string,
        public email: string,
        public paswoord: string,
        public token: string,
        public roleID: number,
        public rol: Role
    ){}
}
