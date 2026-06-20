"use client";

import {useState} from "react";
import "./globals.css";
import "./layout.css";
import Image from "next/image";
import Cross from "@/public/cross.png";

export default function MainLayout({children}: { children: React.ReactNode }) {
    const [isOpenCategory, setIsOpen] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const categoryList = [
        {
            id: 1,
            image: Cross,
            name: "Художественная литература",
            subcategory: [
                {id: 1, name: "Романы"},
                {id: 2, name: "Детективы"},
                {id: 3, name: "Фантастика"},
                {id: 4, name: "Фэнтези"},
                {id: 5, name: "Классика"},
            ],
        },
        {
            id: 2,
            image: Cross,
            name: "Детские книги",
            subcategory: [
                {id: 1, name: "Сказки"},
                {id: 2, name: "Комиксы"},
                {id: 3, name: "Раскраски"},
                {id: 4, name: "Книги для малышей"},
                {id: 5, name: "Подростковая литература"},
            ],
        },
        {
            id: 3,
            image: Cross,
            name: "Образование",
            subcategory: [
                {id: 1, name: "Учебники"},
                {id: 2, name: "ЕГЭ / ОГЭ"},
                {id: 3, name: "Иностранные языки"},
                {id: 4, name: "Математика"},
                {id: 5, name: "История"},
            ],
        },
        {
            id: 4,
            image: Cross,
            name: "Бизнес и саморазвитие",
            subcategory: [
                {id: 1, name: "Бизнес"},
                {id: 2, name: "Финансы"},
                {id: 3, name: "Психология"},
                {id: 4, name: "Мотивация"},
                {id: 5, name: "Лидерство"},
            ],
        },
        {
            id: 5,
            image: Cross,
            name: "Наука и технологии",
            subcategory: [
                {id: 1, name: "Программирование"},
                {id: 2, name: "Искусственный интеллект"},
                {id: 3, name: "Физика"},
                {id: 4, name: "Биология"},
                {id: 5, name: "Космос"},
            ],
        },
        {
            id: 6,
            image: Cross,
            name: "Манга и комиксы",
            subcategory: [
                {id: 1, name: "Манга"},
                {id: 2, name: "Комиксы Marvel"},
                {id: 3, name: "Комиксы DC"},
                {id: 4, name: "Графические романы"},
                {id: 5, name: "Вебтуны"},
            ],
        },
        {
            id: 7,
            image: Cross,
            name: "Подарочные издания",
            subcategory: [
                {id: 1, name: "Коллекционные книги"},
                {id: 2, name: "Иллюстрированные издания"},
                {id: 3, name: "Книги в кожаном переплёте"},
                {id: 4, name: "Подарочные наборы"},
                {id: 5, name: "Артбуки"},
            ],
        },
        {
            id: 8,
            image: Cross,
            name: "Канцелярия",
            subcategory: [
                {id: 1, name: "Блокноты"},
                {id: 2, name: "Ежедневники"},
                {id: 3, name: "Ручки"},
                {id: 4, name: "Закладки"},
                {id: 5, name: "Планеры"},
            ],
        },
    ];

    const handleMouseEnter = (id: number) => {
        setActiveCategory(id);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    const activeCategoryData = categoryList.find(
        (item) => item.id === activeCategory
    );

    return (
        <>
            <nav className="NavigationMenu">
                <div className="NavigationMenuContainer">
                    <div className="NavigationMenuLogoContainer">
                        <div className="BurgerMenuButtonContainer">
                            <svg
                                className={`BurgerMenuButton ${
                                    isOpenBurger ? "is-active" : ""
                                }`}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                onClick={() => setIsOpenBurger(!isOpenBurger)}
                            >
                                <path className="burger-line burger-line-1" d="M4 7h16"/>
                                <path className="burger-line burger-line-2" d="M4 12h16"/>
                                <path className="burger-line burger-line-3" d="M4 17h16"/>
                            </svg>
                        </div>

                        <h1 className="NavigationMenuLogo">
                            Books<span>Shop</span>
                        </h1>
                    </div>

                    <div className="NavigationMenuLeftWrapper">
                        <div className="NavigationMenuCategoryWrapper">
                            <button
                                className={`NavigationMenuCategory ${
                                    isOpenCategory ? "is-active" : ""
                                }`}
                                onClick={() => setIsOpen(!isOpenCategory)}
                            >
                                <svg
                                    className="NavigationMenuCategoryIcon"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path className="burger-line burger-line-1" d="M4 7h16"/>
                                    <path className="burger-line burger-line-2" d="M4 12h16"/>
                                    <path className="burger-line burger-line-3" d="M4 17h16"/>
                                </svg>
                                Категории
                            </button>
                        </div>

                        <div className="NavigationMenuSearch">
                            <svg
                                className="NavigationMenuSearchIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>

                            <input
                                className="NavigationMenuSearchInput"
                                placeholder="Найти книгу, автора или жанр..."
                            />

                            <button className="NavigationMenuSearchButton">Найти</button>
                        </div>
                    </div>

                    <a className="NavigationMenuCreateBookButton" href="/create-book">
                        <svg
                            className="NavigationMenuCreateBookIcon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 5v14"/>
                            <path d="M5 12h14"/>
                        </svg>
                        Создать книгу
                    </a>

                    <a className="NavigationMenuIconButton" href="/favorites">
                        <svg
                            className="NavigationMenuIconButtonSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                        </svg>
                        Избранное
                    </a>

                    <a className="NavigationMenuIconButton" href="/сучка">
                        <div className="NavigationMenuCartIconWrapper">
                            <svg
                                className="NavigationMenuIconButtonSvg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>

                            <span className="NavigationMenuCartBadge">30</span>
                        </div>
                        Корзина
                    </a>

                    <a className="NavigationMenuAuthButton" href="/auth">
                        <svg
                            className="NavigationMenuAuthButtonSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                        Войти
                    </a>
                </div>
            </nav>

            {isOpenCategory && (
                <>
                    <div className="CategoryMenu">
                        <div
                            className="CategoryMenuContainer"
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="CategoryMenuLeftWrapper">
                                {categoryList.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`CategoryMenuLeftWrapperItem ${
                                            activeCategory === item.id ? "active" : ""
                                        }`}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                    >
                                        <Image
                                            className="CategoryMenuLeftWrapperItemImage"
                                            alt={item.name}
                                            src={item.image}
                                        />
                                        <p className="CategoryMenuLeftWrapperItemText">
                                            {item.name}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="CategoryMenuRightWrapper">
                                {activeCategoryData && (
                                    <div className="CategoryMenuRightWrapperContent">
                                        <h3 className="CategoryMenuRightWrapperTitle">
                                            {activeCategoryData.name}
                                        </h3>

                                        <ul className="CategoryMenuRightWrapperList">
                                            {activeCategoryData.subcategory.map((sub) => (
                                                <a
                                                    key={sub.id}
                                                    className="CategoryMenuRightWrapperItem"
                                                >
                                                    {sub.name}
                                                </a>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className="BlurBackground"
                        onClick={() => setIsOpen(false)}
                    ></div>
                </>
            )}

            {children}
        </>
    );
}