'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren, useState } from "react";
import { WebAppProvider } from "./context";

export function Providers({children}: PropsWithChildren) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false
                }
            }
        })
    )

    return (
        <QueryClientProvider client={client}>
            <WebAppProvider>
                {children}
            </WebAppProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}