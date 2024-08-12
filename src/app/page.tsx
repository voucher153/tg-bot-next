"use client";

import { useContext } from "react";
import { webAppContext } from "./context";

export default function Home() {
  const app = useContext(webAppContext);
  
  const tg = window.Telegram.WebApp

  const onClose = () => {
    tg.close()
  }

  return (
    <>
    <button onClick={onClose}>close</button>
    </>
  );
}
