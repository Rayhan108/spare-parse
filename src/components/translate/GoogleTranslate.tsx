/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: any;
    }
}

const GoogleTranslate: React.FC = () => {
    useEffect(() => {
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'google_translate_element'
                );
            };
        };

        addGoogleTranslateScript();
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
