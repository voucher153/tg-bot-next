"use client";

import { useContext, useEffect } from "react";
import { webAppContext } from "./context";
import { TelegramWebApps } from "telegram-webapps-types-new";

export default function Home() {
  const app = useContext(webAppContext);

  const onClose = () => {
    app.close()
  }

  return (
    <>
    <button onClick={onClose}>close</button>
    </>
  );
}
