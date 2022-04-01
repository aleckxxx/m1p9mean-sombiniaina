import { Role } from "./Role";

export interface UserInfo{
    _id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    userType: Role;
    active: boolean;
}