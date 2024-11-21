'use client'

import { userService } from "@/services/user/user.service"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { IUserUpdate } from "./profile.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileForm } from "./profile-form/profile-form"
import s from './profile.module.scss'

export const Profile = async () => {
    
    const {data} = await userService.getProfile()
    console.log(data)

    return (
        <div>
            <div className={s.data}>Смена Данных</div>
            <ProfileForm phone={data.phone} />
        </div>
    )
}