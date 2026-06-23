import Image from "next/image";
import svgIcon from "@/public/change-password-modal-icon.svg";
import "./style.css"

interface ChangePasswordModalIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export const ChangePasswordModalIcon = ({ className, width = 24, height = 24 }: ChangePasswordModalIconProps) => (
    <Image
        src={svgIcon}
        alt="Change password icon"
        className={`${className} ProfileChangePasswordModalIcon ${className}`}
        width={width}
        height={height}
    />
);
