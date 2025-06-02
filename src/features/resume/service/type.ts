import { User } from "../../authorization/services/type";

export type Resume = {
    id: string;
    url: string;
    originalFileName: string;
    fileName: string;
    userId: string;
    user?: User
    createdAt: string;
}