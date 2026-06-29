"use client";

import styles from "./layout.module.css";
import "./globals.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MainLayout({children}: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pages = [
    {
      path: "/",
      name: "Главная",
    },
    {
      path: "/favorites",
      name: "Избранное",
    },
    {
      path: "/chats",
      name: "Чаты",
    },
    {
      path: "/create-book",
      name: "Новое объявление",
    },
  ];

  function handleSearch(e: string) {
    console.log(e);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link className={styles.logo} href="/">
            <img src="/images/header/books.svg" alt=""/>
            <span>ShareBook</span>
          </Link>

          <nav className={styles.nav}>
            <ul>
              {pages.map((page) => {
                const isActive = pathname === page.path;

                return (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className={isActive ? styles.active : ""}
                    >
                      {page.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.search}>
            <input
              type="text"
              placeholder="Ищите фэнтези, детективы, романы"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <img src="/images/header/search.svg" alt=""/>
          </div>

          <div className={styles.actions}>
            <Link href="/login">Войти</Link>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}