import { SVGProps } from "react";

interface AboutMyselfProps extends SVGProps<SVGSVGElement> {
    className?: string;
    onClick?: () => void;
}

export const AboutMyselfIcon = ({ className, onClick, ...props }: AboutMyselfProps) => (
    <svg
        xmlns="http://w3.org"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '8px', verticalAlign: 'middle' }}
    >
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.05 21.35 10.2 20.45 10.05C19.65 9.9 19 9.25 19 8.45V8C19 4.68629 16.3137 2 13 2C8.02944 2 4 6.02944 4 11C4 17.0751 8.92487 22 12 22Z" />
        <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
        <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
        <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
);