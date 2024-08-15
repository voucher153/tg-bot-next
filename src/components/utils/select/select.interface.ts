import { IAuthForm } from "@/types/auth.interface";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface ISelect {
    //control: Control<IAuthForm, any>
    register: UseFormRegister<IAuthForm>
    setValue: UseFormSetValue<IAuthForm>
    setTypeValue: Dispatch<SetStateAction<string>>
    typeValue: string
}