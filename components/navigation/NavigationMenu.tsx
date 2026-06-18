"use client";

import { useState, useCallback, useEffect } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { BurgerIcon } from "@/components/icons";
import { CategoryButton } from "./CategoryButton";
import { NavigationSearch } from "./NavigationSearch";
import { AuthButton } from "./AuthButton";
import { UserAvatar } from "./UserAvatar";
import { NavigationMenuModal } from "./NavigationMenuModal";
import { CategoryMenu } from "./CategoryMenu";
import Link from "next/link";

export const NavigationMenu = () => {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [isOpenNavigationMenu, setIsOpenNavigationMenu] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    const user = useGlobalStore((state) => state.user);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleToggleCategory = useCallback(() => {
        setIsOpenCategory(prev => !prev);
    }, []);

    const handleToggleBurger = useCallback(() => {
        setIsOpenBurger(prev => !prev);
    }, []);

    const handleToggleNavigationMenu = useCallback(() => {
        setIsOpenNavigationMenu(prev => !prev);
    }, []);

    const handleCloseCategory = useCallback(() => {
        setIsOpenCategory(false);
    }, []);

    return (
        <>
            <nav className="NavigationMenu">
                <div className="NavigationMenuContainer">
                    <div className="NavigationMenuLogoContainer">
                        <div className="BurgerMenuButtonContainer">
                            <BurgerIcon
                                className={`BurgerMenuButton ${isOpenBurger ? "is-active" : ""}`}
                                onClick={handleToggleBurger}
                            />
                        </div>
                        <Link href="/" className="NavigationMenuLogo">HappShop</Link>
                    </div>

                    <div className="NavigationMenuLeftWrapper">
                        <CategoryButton isOpen={isOpenCategory} onClick={handleToggleCategory} />
                        <NavigationSearch />
                    </div>

                    {!isMounted ? (
                        <div className="AuthPlaceholder" style={{ width: "40px", height: "40px" }} />
                    ) : user ? (
                        <UserAvatar onClick={handleToggleNavigationMenu} />
                    ) : (
                        <AuthButton />
                    )}

                    <NavigationMenuModal isOpen={isOpenNavigationMenu} />
                </div>
            </nav>
            <CategoryMenu isOpen={isOpenCategory} onClose={handleCloseCategory} />
        </>
    );
};
