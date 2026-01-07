

import type { ReactNode } from "react";

type RouteParams = { locale: string };

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LngLayout({ children, params }: {
  children: ReactNode;
  params: Promise<RouteParams>; // Next 15
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)){
        return notFound()
    }
    return (
        <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <NextIntlClientProvider>
                {children}
            </NextIntlClientProvider>
        </div>
    );
}