import { ChangePasswordModalIcon } from "@/components/icons/ChangePasswordModalIcon";
import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/axios";

interface UpdatePasswordModalProps {
    onClose: () => void;
}

interface PasswordFormState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export function UpdatePasswordModal({ onClose }: UpdatePasswordModalProps) {
    const [form, setForm] = useState<PasswordFormState>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isPasswordVerified) {
                currentPasswordRef.current?.focus();
            } else {
                newPasswordRef.current?.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [isPasswordVerified]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    const updateFormField = (field: keyof PasswordFormState, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        clearFieldError(field);
    };

    const clearFieldError = (field: keyof PasswordFormState) => {
        const errorField = field === "currentPassword" ? "currentPassword" : "newPassword";
        setValidationErrors(prev => ({ ...prev, [errorField]: "" }));
    };

    const validateNewPassword = (): boolean => {
        if (form.newPassword.length < 6) {
            setValidationErrors(prev => ({
                ...prev,
                newPassword: "Пароль должен содержать минимум 6 символов"
            }));
            return false;
        }

        if (form.newPassword !== form.confirmPassword) {
            setValidationErrors(prev => ({
                ...prev,
                newPassword: "Пароли не совпадают"
            }));
            return false;
        }

        return true;
    };

    const handleCheckPassword = async () => {
        setIsButtonDisabled(true);
        setValidationErrors(prev => ({ ...prev, currentPassword: "" }));

        if (!form.currentPassword) {
            setValidationErrors(prev => ({
                ...prev,
                currentPassword: "Введите текущий пароль"
            }));
            setIsButtonDisabled(false);
            currentPasswordRef.current?.focus();
            return;
        }

        try {
            const response = await api.post("user/check-password", {
                password: form.currentPassword
            });

            if (response.status === 200 && response.data === true) {
                setIsPasswordVerified(true);
                setIsButtonDisabled(false);
                setTimeout(() => newPasswordRef.current?.focus(), 100);
            }
        } catch (error: any) {
            setIsButtonDisabled(false);

            if (error.response?.status === 400) {
                setValidationErrors(prev => ({
                    ...prev,
                    currentPassword: error.response.data?.messages || "Неверный пароль"
                }));
            } else if (error.response) {
                setValidationErrors(prev => ({
                    ...prev,
                    currentPassword: "Ошибка проверки пароля"
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    currentPassword: "Ошибка соединения с сервером"
                }));
            }
            currentPasswordRef.current?.focus();
        }
    };

    const handleUpdatePassword = async () => {
        setIsButtonDisabled(true);
        setValidationErrors(prev => ({ ...prev, newPassword: "" }));

        if (!validateNewPassword()) {
            setIsButtonDisabled(false);
            if (form.newPassword.length < 6) {
                newPasswordRef.current?.focus();
            } else if (form.newPassword !== form.confirmPassword) {
                confirmPasswordRef.current?.focus();
            }
            return;
        }

        try {
            const response = await api.post("user/update-password", {
                oldPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword
            });

            if (response.status === 200) {
                handleClose();
            }
        } catch (error: any) {
            setIsButtonDisabled(false);

            if (error.response?.status === 400) {
                setValidationErrors(prev => ({
                    ...prev,
                    newPassword: error.response.data?.messages || "Ошибка при обновлении пароля"
                }));
            } else if (error.response) {
                setValidationErrors(prev => ({
                    ...prev,
                    newPassword: "Произошла ошибка. Попробуйте позже."
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    newPassword: "Ошибка соединения с сервером"
                }));
            }
            newPasswordRef.current?.focus();
        }
    };

    const handleClose = () => {
        setForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setIsPasswordVerified(false);
        setValidationErrors({
            currentPassword: "",
            newPassword: ""
        });
        setIsButtonDisabled(false);
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isButtonDisabled) {
            e.preventDefault();
            if (!isPasswordVerified) {
                void handleCheckPassword();
            } else {
                void handleUpdatePassword();
            }
            return;
        }

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();

            const inputs = getInputsList();
            const currentIndex = inputs.findIndex(input => input === e.currentTarget);

            if (currentIndex === -1) return;

            let nextIndex = currentIndex;
            if (e.key === "ArrowDown") {
                nextIndex = Math.min(currentIndex + 1, inputs.length - 1);
            } else if (e.key === "ArrowUp") {
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            const nextInput = inputs[nextIndex];
            if (nextInput) {
                nextInput.focus();
                nextInput.select();
            }
        }
    };

    const getInputsList = (): HTMLInputElement[] => {
        const inputs: HTMLInputElement[] = [];

        if (!isPasswordVerified && currentPasswordRef.current) {
            inputs.push(currentPasswordRef.current);
        } else if (isPasswordVerified) {
            if (newPasswordRef.current) inputs.push(newPasswordRef.current);
            if (confirmPasswordRef.current) inputs.push(confirmPasswordRef.current);
        }

        return inputs;
    };

    const renderInput = (
        value: string,
        onChange: (value: string) => void,
        placeholder: string,
        errorMessage: string,
        ref: React.RefObject<HTMLInputElement | null>,
        key?: string
    ) => (
        <input
            key={key}
            ref={ref}
            value={value}
            type="password"
            placeholder={placeholder}
            tabIndex={0}
            className={`ProfileChangePasswordModalContentInput ${errorMessage ? "Invalid" : ""}`}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );

    return (
        <div className="ProfileChangePasswordModal">
            <div className="ProfileChangePasswordModalBackgroundBlur" onClick={handleClose} />
            <div className="ProfileChangePasswordModalContent" ref={modalContentRef}>
                <ChangePasswordModalIcon />

                <div className="ProfileChangePasswordModalContentTextContainer">
                    <p className="ProfileChangePasswordModalContentTitle">Смена пароля</p>
                    <p className="ProfileChangePasswordModalContentDescription">
                        Ваш аккаунт защищен паролем, для его смены введите текущий пароль.
                    </p>
                </div>

                {!isPasswordVerified ? (
                    <div className="ProfileChangePasswordModalContentInputTextContainer">
                        <div>
                            {validationErrors.currentPassword && (
                                <p className="ProfileChangePasswordModalContentInputText Invalid">
                                    {validationErrors.currentPassword}
                                </p>
                            )}
                            {renderInput(
                                form.currentPassword,
                                (value) => updateFormField("currentPassword", value),
                                "Текущий пароль",
                                validationErrors.currentPassword,
                                currentPasswordRef
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="ProfileChangePasswordModalContentInputTextContainer">
                        <div>
                            {validationErrors.newPassword && (
                                <p className="ProfileChangePasswordModalContentInputText Invalid">
                                    {validationErrors.newPassword}
                                </p>
                            )}
                            {renderInput(
                                form.newPassword,
                                (value) => updateFormField("newPassword", value),
                                "Новый пароль",
                                validationErrors.newPassword,
                                newPasswordRef,
                                "new-password"
                            )}
                        </div>
                        {renderInput(
                            form.confirmPassword,
                            (value) => updateFormField("confirmPassword", value),
                            "Повторите пароль",
                            validationErrors.newPassword,
                            confirmPasswordRef,
                            "confirm-password"
                        )}
                    </div>
                )}

                <div className="ProfileChangePasswordModalButtonsContainer">
                    <button
                        className="ProfileChangePasswordModalContentCancelButton"
                        onClick={handleClose}
                        tabIndex={-1}
                    >
                        Отмена
                    </button>
                    <button
                        className="ProfileChangePasswordModalContentNextButton"
                        disabled={isButtonDisabled}
                        onClick={() => {
                            if (!isPasswordVerified) {
                                void handleCheckPassword();
                            } else {
                                void handleUpdatePassword();
                            }
                        }}
                        tabIndex={-1}
                    >
                        {!isPasswordVerified ? "Далее" : "Сменить"}
                    </button>
                </div>
            </div>
        </div>
    );
}