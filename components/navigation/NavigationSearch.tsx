import { SearchIcon } from "@/components/icons";

export const NavigationSearch = () => (
    <div className="NavigationMenuSearch">
        <SearchIcon className="NavigationMenuSearchIcon" />
        <input
            className="NavigationMenuSearchInput"
            placeholder="Введите текст..."
        />
        <button className="NavigationMenuSearchButton">Найти</button>
    </div>
);