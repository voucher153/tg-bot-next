"use client";

import { useContext, useEffect } from "react";
import { webAppContext } from "./context";
import { TelegramWebApps } from "telegram-webapps-types-new";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";
import { HomePage } from "@/components/ui/homePage/home";

export default function Home() {
  const app = useContext(webAppContext);

  const onClose = () => {
    app.close()
  }

  const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess() {
            push('/login')
        }
    })

    const onSub = async () => {
      debugger
        mutate()
    }

  return (
    <>
      <button onClick={onClose}>close</button>
      <button onClick={onSub}>logout</button>
      <HomePage />
    </>
  );
}
