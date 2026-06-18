"use client";

import { useState } from "react";
import "./profile.css";
import { AboutMyselfIcon, UserIcon } from "@/components/icons";
import {SettingsIcon} from "@/components/icons/SettingsIcon";

export default function Profile() {
    const [activeButtonId, setActiveButtonId] = useState<number>(1);

    const NAVIGATION_MENU_BUTTONS = [
        { id: 1, icon: <AboutMyselfIcon />, text: "О себе" },
        { id: 2, icon: <UserIcon />, text: "Аккаунт" },
        { id: 3, icon: <SettingsIcon />, text: "Настройки" }
    ];

    const handleButtonClick = (id: number) => {
        setActiveButtonId(id);
    };

    return (
        <div className="Profile">
            <div className="ProfileNavigationMenu">
                <div className="ProfileNavigationMenuButtonsContainer">
                    {NAVIGATION_MENU_BUTTONS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleButtonClick(item.id)}
                            className={`ProfileNavigationMenuButton ${activeButtonId === item.id ? "Active" : ""}`}
                        >
                            {item.icon}
                            {item.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="ProfileContent">
                <p className="ProfileContentTitle">
                    {NAVIGATION_MENU_BUTTONS.find(item =>
                        item.id === activeButtonId)?.text || "О себе"}
                </p>
            </div>
        </div>
    );
}