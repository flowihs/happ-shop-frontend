import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Cross from "@/public/cross.png";
import { StaticImageData } from "next/image";

interface Subcategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    image: StaticImageData;
    name: string;
    subcategory: Subcategory[];
}

const CATEGORY_LIST: Category[] = [
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

interface CategoryMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CategoryMenu = ({ isOpen, onClose }: CategoryMenuProps) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    const handleMouseEnter = useCallback((id: number) => {
        setActiveCategory(id);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setActiveCategory(null);
    }, []);

    const activeCategoryData = useMemo(
        () => CATEGORY_LIST.find((item: Category) => item.id === activeCategory),
        [activeCategory]
    );

    if (!isOpen) return null;

    return (
        <>
            <div className="CategoryMenu">
                <div className="CategoryMenuContainer" onMouseLeave={handleMouseLeave}>
                    <div className="CategoryMenuLeftWrapper">
                        {CATEGORY_LIST.map((item: Category) => (
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
                                    {activeCategoryData.subcategory.map((sub: Subcategory) => (
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
            <div className="BlurBackground" onClick={onClose} />
        </>
    );
};