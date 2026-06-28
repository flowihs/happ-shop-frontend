import { SVGProps } from "react";

interface ArrowDownProps extends SVGProps<SVGSVGElement> {
    className?: string;
    onClick?: () => void;
}

export const ArrowDownIcon = ({ className, onClick, ...props }: ArrowDownProps) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://w3.org"
        className={className}
        {...props}
    >
        <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

