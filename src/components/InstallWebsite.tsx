import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        setDeferredPrompt(null);
        setVisible(false);
    };

    if (!visible) return null;
    return (
        <Button className="bg-green-700 cursor-pointer" onClick={handleInstallClick}>
            تثبيت التطبيق
        </Button>
    );
}

export default InstallButton;
