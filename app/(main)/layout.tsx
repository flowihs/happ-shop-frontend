"use client";

import { useState } from "react";
import "./globals.css";
import "./layout.css";
import Image from "next/image";
import Cross from "@/public/cross.png";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isOpenCategory, setIsOpen] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const categoryList = [
        {
            id: 1,
            image: Cross,
            name: "Кроссовки",
            subcategory: [
                { id: 1, name: "Adidas" },
                { id: 2, name: "Nike" },
                { id: 3, name: "Puma" },
            ]
        },
        {
            id: 2,
            image: Cross,
            name: "Одежда",
            subcategory: [
                { id: 1, name: "Футболки" },
                { id: 2, name: "Джинсы" },
                { id: 3, name: "Куртки" },
            ]
        },
        {
            id: 3,
            image: Cross,
            name: "Аксессуары",
            subcategory: [
                { id: 1, name: "Сумки" },
                { id: 2, name: "Ремни" },
                { id: 3, name: "Очки" },
            ]
        },
        {
            id: 4,
            image: Cross,
            name: "Спорт",
            subcategory: [
                { id: 1, name: "Мячи" },
                { id: 2, name: "Тренажеры" },
                { id: 3, name: "Форма" },
            ]
        },
        {
            id: 5,
            image: Cross,
            name: "Электроника",
            subcategory: [
                { id: 1, name: "Телефоны" },
                { id: 2, name: "Ноутбуки" },
                { id: 3, name: "Наушники" },
            ]
        },
    ];

    const handleMouseEnter = (id: number) => {
        setActiveCategory(id);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    const activeCategoryData = categoryList.find(item => item.id === activeCategory);

    return (
        <>
            <nav className="NavigationMenu">
                <div className="NavigationMenuContainer">
                    <div className="NavigationMenuLogoContainer">
                        <div className="BurgerMenuButtonContainer">
                            <svg
                                className={`BurgerMenuButton ${isOpenBurger ? "is-active" : ""}`}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                onClick={() => setIsOpenBurger(!isOpenBurger)}
                            >
                                <path
                                    className="burger-line burger-line-1"
                                    d="M4 7h16"
                                />
                                <path
                                    className="burger-line burger-line-2"
                                    d="M4 12h16"
                                />
                                <path
                                    className="burger-line burger-line-3"
                                    d="M4 17h16"
                                />
                            </svg>
                        </div>
                        <h1 className="NavigationMenuLogo">HappShop</h1>
                    </div>
                    <div className="NavigationMenuLeftWrapper">

                        <div className="NavigationMenuCategoryWrapper">
                            <button
                                className={`NavigationMenuCategory ${isOpenCategory ? "is-active" : ""}`}
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
                                    <path
                                        className="burger-line burger-line-1"
                                        d="M4 7h16"
                                    />
                                    <path
                                        className="burger-line burger-line-2"
                                        d="M4 12h16"
                                    />
                                    <path
                                        className="burger-line burger-line-3"
                                        d="M4 17h16"
                                    />
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
                                placeholder="Введите текст..."
                            />
                            <button className="NavigationMenuSearchButton">
                                Найти
                            </button>
                        </div>
                    </div>

                    <a className="NavigationMenuAuthButton">
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                        </svg>
                        Войти
                    </a>

                </div>
            </nav>

            {isOpenCategory && (
                <>
                    <div className="CategoryMenu">
                        <div className="CategoryMenuContainer"
                             onMouseLeave={handleMouseLeave}
                        >
                            <div className="CategoryMenuLeftWrapper">
                                {categoryList.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`CategoryMenuLeftWrapperItem ${activeCategory === item.id ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                    >
                                        <Image
                                            className="CategoryMenuLeftWrapperItemImage"
                                            alt={item.name}
                                            src={Cross}
                                        />
                                        <p className="CategoryMenuLeftWrapperItemText">{item.name}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="CategoryMenuRightWrapper">
                                {activeCategoryData && (
                                    <div className="CategoryMenuRightWrapperContent">
                                        <h3 className="CategoryMenuRightWrapperTitle">{activeCategoryData.name}</h3>
                                        <ul className="CategoryMenuRightWrapperList">
                                            {activeCategoryData.subcategory.map((sub) => (
                                                <a key={sub.id} className="CategoryMenuRightWrapperItem">
                                                    {sub.name}
                                                </a>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="BlurBackground" onClick={() => setIsOpen(false)}></div>
                </>
            )}

            {children}
        </>
    );
}