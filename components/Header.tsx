"use client";

import styles from "./header.module.css";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

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

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) return;

    router.push(`/search?q=${encodeURIComponent(trimmedValue)}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} href="/">
          <img src="/images/header/books.svg" alt="ShareBook logo"/>
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

        <form className={styles.search} onSubmit={handleSearch}>
          <input
            type="text"
            value={searchValue}
            placeholder="Ищите фэнтези, детективы, романы"
            onChange={(event) => setSearchValue(event.target.value)}
          />

          <button type="submit" className={styles.searchButton}>
            <img src="/images/header/search.svg" alt="Найти"/>
          </button>
        </form>

        <div className={styles.actions}>
          <Link href="/login">Войти</Link>
        </div>
      </div>
    </header>
  );
}