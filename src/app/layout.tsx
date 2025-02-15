import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const robotoCondensed = Roboto_Condensed({
    variable: '--font-roboto-condensed',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Stay in line',
    description: 'Build habits and improve productivity',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} `}
            >
                {children}
            </body>
        </html>
    );
}
