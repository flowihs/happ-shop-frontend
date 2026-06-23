"use client";

import {useState} from "react";
import "./profile.css";
import {AboutMyselfIcon, UserIcon} from "@/components/icons";
import {SettingsIcon} from "@/components/icons/SettingsIcon";
import {useGlobalStore} from "@/store/globalStore";
import {UpdatePasswordModal} from "@/components/profile/UpdatePasswordModal";

export default function Profile() {
    const [activeButtonId, setActiveButtonId] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useGlobalStore((state) => state.user);

    const NAVIGATION_MENU_BUTTONS = [
        {id: 1, icon: <AboutMyselfIcon/>, text: "О себе"},
        {id: 2, icon: <UserIcon/>, text: "Аккаунт"},
        {id: 3, icon: <SettingsIcon/>, text: "Настройки"}
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleButtonClick = (id: number) => {
        setActiveButtonId(id);
    };

    const renderContent = () => {
        switch (activeButtonId) {
            case 1:
                return <div>Tut</div>;
            case 2:
                return (
                    <>
                        <div className="ProfileContentItem">
                            <div className="ProfileContentItemTextContainer">
                                <p className="ProfileContentItemTitle">Почта</p>
                                <p className="ProfileContentItemDescription">Почта, к которой привязан аккаунт</p>
                            </div>
                            <input placeholder={user?.email} className="ProfileContentItemInput"/>
                        </div>
                        <div className="ProfileContentItem">
                            <div className="ProfileContentItemTextContainer">
                                <p className="ProfileContentItemTitle">Пароль</p>
                                <p className="ProfileContentItemDescription">Смените пароль для входа в аккаунт</p>
                            </div>
                            <button
                                className="ProfileContentItemChangePasswordButton"
                                onClick={() => openModal()}
                            >
                                Изменить пароль
                            </button>
                        </div>
                        <div className="ProfileContentItem">
                            <div className="ProfileContentItemTextContainer">
                                <p className="ProfileContentItemTitle">Город проживания</p>
                                <p className="ProfileContentItemDescription">Нужен для подбора книг в вашем городе</p>
                            </div>
                            <input placeholder="Санкт-Петербург" className="ProfileContentItemInput"/>
                        </div>
                        <div className="ProfileContentItem">
                            <div className="ProfileContentItemTextContainer">
                                <p className="ProfileContentItemTitle">Город проживания</p>
                                <p className="ProfileContentItemDescription">Нужен для подбора книг в вашем городе</p>
                            </div>
                            <button>Русский</button>
                        </div>
                    </>
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