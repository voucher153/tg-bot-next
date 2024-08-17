
import React, { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import type { TelegramWebApps } from 'telegram-webapps-types-new';

interface IProps {
    children: React.ReactNode;
}

export const webAppContext = createContext<TelegramWebApps.WebApp>({} as TelegramWebApps.WebApp);

export const WebAppProvider = ({ children }: IProps) => {
    const [app, setApp] = useState({} as TelegramWebApps.WebApp);

    // useEffect(() => {
    //     setApp(window.Telegram.WebApp);
    // }, []);
    useEffect(() => {
        console.log('useTelegram')
        function initTg() {
            if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
                console.log('Telegram WebApp is set');
                const tgData = window.Telegram.WebApp
                setApp(tgData);
            } else {
                console.log('Telegram WebApp is undefined, retrying…');
                setTimeout(initTg, 500);
            }
        }
        initTg();
    }, []);

    useEffect(() => {
        if (!app) return;
        if (app.ready) app.ready();
    }, [app]);

    return (
        <webAppContext.Provider value={app}>
            {children}
        </webAppContext.Provider>
    );
};
