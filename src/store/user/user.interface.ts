import { IUser, IUserPersonal } from "../../types/auth.interface";

export interface IInitialState {
    user: IUserPersonal | null,
    isLoading: boolean
}