import { useState } from "react";
import { Asterisk, EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormContext, type FieldValues, type RegisterOptions, type UseFormRegister } from "react-hook-form";
import UiButton from "./UiButton";

type TTextInputProps = {
  containerClass?: string;
  label?: string;
  icon?: React.ReactNode;
  registerOptions?: RegisterOptions<FieldValues, string>;
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  textHint?: string;
  textHintClassName?: string;
  min?: string;
  max?: string;
  autoComplete?: string;
  error?: string;
};

function UiTextInput({
  containerClass,
  label,
  icon,
  registerOptions,
  name,
  className,
  placeholder,
  disabled,
  textHint,
  type = "text",
  min,
  max,
  autoComplete = "off",
  textHintClassName,
  error,
}: TTextInputProps) {
  const {
    register,
    formState: { errors },
  }: { register: UseFormRegister<FieldValues>; formState: { errors: any } } =
    useFormContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  let errorMessage = error || "";
  if (!errorMessage && name) {
    if (name.includes(".")) {
      const path = name.split(".");
      let current = errors;
      for (const segment of path) {
        if (!current || !current[segment]) {
          current = undefined;
          break;
        }
        current = current[segment];
      }
      errorMessage = current?.message || "";
    } else {
      errorMessage = String(errors[name]?.message || "");
    }
  }

  const handlePasswordText = () => setPasswordVisible(!isPasswordVisible);

  return (
    <div className={`flex flex-col w-full gap-1 ${containerClass}`}>

      {label && (
        <label className="text-xs flex items-center gap-1 text-left text-gray-700 font-semibold pl-1">
          {label}
          {registerOptions?.required && (
            <Asterisk className="size-2 text-red-500 -translate-y-1" />
          )}
        </label>
      )}

      <section className="w-full relative">
        <input
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, registerOptions)}
          autoComplete={autoComplete}
          data-iserror={!!errorMessage}
          className={`h-10 w-full text-sm text-gray-700 font-semibold px-2 py-1 placeholder:font-medium 
          placeholder:text-gray-400 outline-none rounded border border-gray-300 
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
          disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-100 
          data-[iserror=true]:border-red-500 ${className}`}
          min={min}
          max={max}
        />

    
        <span
          data-error={!!errorMessage}
          className="absolute w-5 right-3 top-1/2 -translate-y-1/2 text-gray-500 data-[error=true]:text-red-500"
        >
          {icon}
          {type === "password" && (
            <UiButton
              type="button"
              buttonType="tertiary"
              className="bg-transparent"
              icon={
                isPasswordVisible ? (
                  <EyeIcon className="size-4 text-gray-500" />
                ) : (
                  <EyeOffIcon className="size-4 text-gray-500" />
                )
              }
              onClick={handlePasswordText}
            />
          )}
        </span>
      </section>

    
      {errorMessage ? (
        <p className="text-xs text-red-500 font-medium pl-1">{errorMessage}</p>
      ) : (
        textHint && (
          <p
            className={`text-xs font-medium text-gray-500 pl-1 w-full ${textHintClassName}`}
          >
            {textHint}
          </p>
        )
      )}
    </div>
  );
}

export default UiTextInput;
