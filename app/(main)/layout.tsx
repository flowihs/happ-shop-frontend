"use client";

import "./globals.css";
import "./layout.css";
import { NavigationMenu } from "@/components/navigation/NavigationMenu";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationMenu />
            <main className="MainLayoutContentContainer">
                { children }
            </main>
        </>
    );
}