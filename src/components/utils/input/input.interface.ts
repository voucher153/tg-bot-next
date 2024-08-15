import { IAuthForm } from "@/types/auth.interface";
import { UseFormRegister } from "react-hook-form";

export interface IInput {
    register: UseFormRegister<IAuthForm>
    name: "type" | "username" | "company" | "phone" | "code"
    type: string
    placeholder?: string
    defaultValue?: string
}