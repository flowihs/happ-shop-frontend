"use client";

import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/Header";

export default function MainLayout({children}: { children: React.ReactNode }) {

  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}