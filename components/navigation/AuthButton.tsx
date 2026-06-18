import { UserIcon } from "@/components/icons";

export const AuthButton = () => (
    <a className="NavigationMenuAuthButton" href="/auth">
        <UserIcon className="NavigationMenuAuthButtonSvg" />
        Войти
    </a>
);