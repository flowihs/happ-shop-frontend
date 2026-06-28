"use client";

import { useState, useRef, useEffect } from "react";
import "./profile.css";
import { AboutMyselfIcon, UserIcon } from "@/components/icons";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { useGlobalStore } from "@/store/globalStore";
import { UpdatePasswordModal } from "@/components/settings/UpdatePasswordModal";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { api } from "@/lib/axios";
import {AccountProfile} from "@/components/settings/AccountProfile";

const cities = [
    "Минск", "Гомель", "Гродно", "Витебск", "Могилёв",
    "Брест", "Бобруйск", "Барановичи", "Борисов", "Пинск", "Орша", "Мозырь", "Лида"
];

export default function Profile() {
    const [activeButtonId, setActiveButtonId] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useGlobalStore((state) => state.user);
    const [isActiveChangeLanguage, setIsActiveChangeLanguage] = useState<boolean>(false);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");

    const [cityInput, setCityInput] = useState<string>("");
    const [filteredCities, setFilteredCities] = useState<string[]>([]);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const cityDropdownRef = useRef<HTMLDivElement>(null);

    const NAVIGATION_MENU_BUTTONS = [
        { id: 1, icon: <AboutMyselfIcon />, text: "О себе" },
        { id: 2, icon: <UserIcon />, text: "Аккаунт" },
        { id: 3, icon: <SettingsIcon />, text: "Настройки" }
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleButtonClick = (id: number) => {
        setActiveButtonId(id);
    };

    const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCityInput(value);
        setSelectedCity("");

        if (value.trim() === "") {
            setFilteredCities([]);
            setIsCityDropdownOpen(false);
            return;
        }

        const filtered = cities.filter(city =>
            city.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCities(filtered);
        setIsCityDropdownOpen(filtered.length > 0);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setCityInput(city);
        setIsCityDropdownOpen(false);
        setFilteredCities([]);
    };

    const handleChangeDeleteStatusAccountButton = () => {
        api.post("/user/change-delete-status")
    }

    const handleSaveButton = async () => {
        try {
            await api.post(
                "/settings/update",
                {
                    id: user?.settings?.id,
                    language: currentLanguage === "Русский" ? "RUSSIAN" : "ENGLISH",
                    city: selectedCity || cityInput
                }
            );
        } catch (error) {
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
                setIsCityDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (user?.settings?.language === "RUSSIAN") {
            setCurrentLanguage("Русский");
        } else if (user?.settings?.language === "ENGLISH") {
            setCurrentLanguage("English");
        }

        if (user?.settings?.city) {
            setCityInput(user.settings.city);
            setSelectedCity(user.settings.city);
        }
    }, [user?.settings]);

    const renderContent = () => {
        switch (activeButtonId) {
            case 1:
                return <div>Tut</div>;
            case 2:
                return (
                    <AccountProfile />
                );
            case 3:
                return <div>Tut</div>;
            default:
                return null;
        }
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

                <div className="ProfileContentContainer">
                    {renderContent()}
                </div>
            </div>

            {isModalOpen && (
                <UpdatePasswordModal
                    onClose={closeModal}
                />
            )}
        </div>
    );
}