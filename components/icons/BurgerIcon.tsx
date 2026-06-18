import { SVGProps } from "react";

interface BurgerIconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    onClick?: () => void;
}

export const BurgerIcon = ({ className, onClick, ...props }: BurgerIconProps) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={onClick}
        {...props}
    >
        <path className="burger-line burger-line-1" d="M4 7h16" />
        <path className="burger-line burger-line-2" d="M4 12h16" />
        <path className="burger-line burger-line-3" d="M4 17h16" />
    </svg>
);