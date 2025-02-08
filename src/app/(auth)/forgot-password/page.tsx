'use client'

import { userService } from "@/services/user/user.service"
import { SmsSend } from "@/types/sms.interface"
import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const {mutate} = useMutation({
        mutationKey: ['send sms'],
        mutationFn: (data: SmsSend) => userService.sendSms(data),
        onSuccess() {
            toast.success('Отправлено')
        },
        onError(error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
                console.log(error)
            }
        }
    })

    const data: SmsSend = {
        to: '79378545291',
        from: 'ZhFactory',
        sms: 'Hello',
        type: 'plain',
        channel: 'generic',
        api_key: 'TLSfbnoXoSiQocgIbtHEqojnYovDNaCWasinHmQJVVHnJYaVTgXXViuTdCeiIc'
    }

    return (
        <div>
            <div onClick={() => mutate(data)}>
                send sms
            </div>
        </div>
    )
}