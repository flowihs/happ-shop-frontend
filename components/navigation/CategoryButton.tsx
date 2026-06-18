import { BurgerIcon } from "@/components/icons";

interface CategoryButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export const CategoryButton = ({ isOpen, onClick }: CategoryButtonProps) => (
    <div className="NavigationMenuCategoryWrapper">
        <button
            className={`NavigationMenuCategory ${isOpen ? "is-active" : ""}`}
            onClick={onClick}
        >
            <BurgerIcon className="NavigationMenuCategoryIcon" />
            Категории
        </button>
    </div>
);