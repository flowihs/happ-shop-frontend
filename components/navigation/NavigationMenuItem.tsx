import { ReactNode } from "react";

interface NavigationMenuItemProps {
    href?: string;
    icon: ReactNode;
    children: ReactNode;
}

export const NavigationMenuItem = ({ href, icon, children }: NavigationMenuItemProps) => (
    <a href={href} className="NavigationMenuModalItem">
        {icon}
        {children}
    </a>
);