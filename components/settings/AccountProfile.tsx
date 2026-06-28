"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { UpdatePasswordModal } from "@/components/settings/UpdatePasswordModal";
import { useGlobalStore } from "@/store/globalStore";
import { api } from "@/lib/axios";

const cities = [
    "Минск", "Гомель", "Гродно", "Витебск", "Могилёв",
    "Брест", "Бобруйск", "Барановичи", "Борисов", "Пинск", "Орша", "Мозырь", "Лида"
];

export function AccountProfile() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useGlobalStore((state) => state.user);
    const [isActiveChangeLanguage, setIsActiveChangeLanguage] = useState<boolean>(false);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");

    const [cityInput, setCityInput] = useState<string>("");
    const [filteredCities, setFilteredCities] = useState<string[]>([]);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const cityDropdownRef = useRef<HTMLDivElement>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
            console.error("Failed to save settings:", error);
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

    return (
        <>
            <div className="ProfileContentItem">
                <div className="ProfileContentItemTextContainer">
                    <p className="ProfileContentItemTitle">Почта</p>
                    <p className="ProfileContentItemDescription">Почта, к которой привязан аккаунт</p>
                </div>
                <input
                    placeholder={user?.email || "Не указан"}
                    className="ProfileContentItemInput"
                    disabled
                />
            </div>

            <div className="ProfileContentItem">
                <div className="ProfileContentItemTextContainer">
                    <p className="ProfileContentItemTitle">Пароль</p>
                    <p className="ProfileContentItemDescription">Смените пароль для входа в аккаунт</p>
                </div>
                <button
                    className="ProfileContentItemChangePasswordButton"
                    onClick={openModal}
                >
                    Изменить пароль
                </button>
            </div>

            <div className="ProfileContentItem" ref={cityDropdownRef}>
                <div className="ProfileContentItemTextContainer">
                    <p className="ProfileContentItemTitle">Город проживания</p>
                    <p className="ProfileContentItemDescription">Нужен для подбора книг в вашем городе</p>
                </div>
                <div className="ProfileCityInputWrapper">
                    <input
                        placeholder="Введите город..."
                        className="ProfileContentItemInput ProfileCityInput"
                        value={cityInput}
                        onChange={handleCityInputChange}
                        onFocus={() => {
                            if (cityInput.trim() !== "") {
                                const filtered = cities.filter(city =>
                                    city.toLowerCase().includes(cityInput.toLowerCase())
                                );
                                setFilteredCities(filtered);
                                setIsCityDropdownOpen(filtered.length > 0);
                            }
                        }}
                    />
                    {isCityDropdownOpen && filteredCities.length > 0 && (
                        <div className="ProfileCityDropdown">
                            {filteredCities.map((city) => (
                                <button
                                    key={city}
                                    className="ProfileCityDropdownItem"
                                    onClick={() => handleCitySelect(city)}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="ProfileContentItem">
                <div className="ProfileContentItemTextContainer">
                    <p className="ProfileContentItemTitle">Язык</p>
                    <p className="ProfileContentItemDescription">Выберите язык интерфейса</p>
                </div>

                <button
                    onClick={() => setIsActiveChangeLanguage(!isActiveChangeLanguage)}
                    className={isActiveChangeLanguage ? "ProfileContentItemChangeLanguagesButton Active" : "ProfileContentItemChangeLanguagesButton"}
                >
                    <span className="ProfileContentItemChangeLanguagesButtonText">{currentLanguage}</span>
                    <ArrowDownIcon className={isActiveChangeLanguage ? "ProfileContentItemChangeLanguagesButtonSvg Active" : "ProfileContentItemChangeLanguagesButtonSvg"} />
                    {isActiveChangeLanguage && (
                        <div className="ProfileContentItemChangeLanguagesModal">
                            <button
                                className="ProfileContentItemChangeLanguagesModalButton"
                                onClick={() => {
                                    setCurrentLanguage("Русский");
                                    setIsActiveChangeLanguage(false);
                                }}
                            >
                                Русский
                            </button>
                            <button
                                className="ProfileContentItemChangeLanguagesModalButton"
                                onClick={() => {
                                    setCurrentLanguage("English");
                                    setIsActiveChangeLanguage(false);
                                }}
                            >
                                English
                            </button>
                        </div>
                    )}
                </button>
            </div>

            <div className="ProfileContentItem">
                <div className="ProfileContentItemTextContainer">
                    <p className="ProfileContentItemTitle">Удалить аккаунт</p>
                    <p className="ProfileContentItemDescription">Удалив аккаунт, вы удалите все объявления и чаты,<br /> существующие на этом аккаунте. Восстановить аккаунт будет нельзя.</p>
                </div>
                <button onClick={handleChangeDeleteStatusAccountButton} className="ProfileContentItemDeleteAccountButton">
                    <span>Удалить аккаунт</span>
                </button>
            </div>

            <button onClick={handleSaveButton} className="ProfileSaveButton">
                Сохранить
            </button>

            {isModalOpen && (
                <UpdatePasswordModal
                    onClose={closeModal}
                />
            )}
        </>
    );
}