import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
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

        // Show the install prompt
        await deferredPrompt.prompt();

        // Wait for the user's response
        await deferredPrompt.userChoice;

        // Reset the prompt state so it can't be used again
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
