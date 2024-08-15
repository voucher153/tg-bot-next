import Image from "next/image";
import React from "react";
import BgImage from "../../../public/login_background.jpg"
import Logo from "../../../public/netflix_logo.svg"
import { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
    title: 'Auth',
    ...NO_INDEX_PAGE
}

export default function AuthLayout({children}: {children: React.ReactNode}) {

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <p className="text-slate-600">hi</p>
            {children}
        </div>
    )
}