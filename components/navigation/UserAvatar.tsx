interface UserAvatarProps {
    onClick: () => void;
}

export const UserAvatar = ({ onClick }: UserAvatarProps) => (
    <div onClick={onClick} className="NavigationMenuAvatar" />
);