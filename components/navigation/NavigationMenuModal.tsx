import { NavigationMenuItem } from "./NavigationMenuItem";
import { UserIcon } from "@/components/icons";

interface NavigationMenuModalProps {
    isOpen: boolean;
}

export const NavigationMenuModal = ({ isOpen }: NavigationMenuModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="NavigationMenuModal">
            <NavigationMenuItem href="/settings" icon={<UserIcon className="NavigationMenuAuthButtonSvg" />}>
                Личный кабинет
            </NavigationMenuItem>
            <NavigationMenuItem icon={<UserIcon className="NavigationMenuAuthButtonSvg" />}>
                Профиль
            </NavigationMenuItem>
            <NavigationMenuItem icon={<UserIcon className="NavigationMenuAuthButtonSvg" />}>
                Профиль
            </NavigationMenuItem>
        </div>
    );
};