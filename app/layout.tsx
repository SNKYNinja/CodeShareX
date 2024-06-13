import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { Metadata } from "next";

const defaultUrl =
    process.env.VERCEL_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "CodeShareX",
    description: "Your go to tool for managing code snippets",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="text-foreground min-h-screen bg-gradient-to-br from-background via-slate-800 to-slate-900">
                <main className="min-h-screen p-6">{children}</main>
                <Toaster theme="dark" />
            </body>
        </html>
    );
}
