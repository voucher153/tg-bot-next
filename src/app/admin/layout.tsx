import React from "react";
import { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Header } from "@/components/ui/admin/header/header";

export const metadata: Metadata = {
    title: 'Admin',
    ...NO_INDEX_PAGE
}

export default function AdminLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}