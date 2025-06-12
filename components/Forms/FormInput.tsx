"use client"

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IInput {
    name: string;
    type?: string;
    size?: "large" | "small"; // This size prop won't directly map to Shadcn, we'll handle it with classes
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: any;
    className?: string; // Add className prop for custom styling
}

const FormInput = ({
    name,
    type,
    value,
    id,
    placeholder,
    label,
    required,
    disabled,
    onChange,
    className
}: IInput) => {
    const { control, formState: { errors } } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div className={cn("grid gap-2", className)}>
            {label && (
                <Label htmlFor={id || name}>
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        id={id || name}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...field}
                        value={value !== undefined ? value : field.value}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) onChange(e);
                        }}
                    />
                )}
            />
            {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}
        </div>
    );
};

export default FormInput;
