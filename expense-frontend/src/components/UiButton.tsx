import { LoaderCircle } from "lucide-react";
import React from "react";

type CTButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  text?: React.ReactNode;
  buttonType?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
  isLoading?: boolean;
  tertiaryLoaderText?: string;
};

const UiButton = ({
  text,
  buttonType = "primary",
  icon,
  isLoading,
  type = "button",
  ...rest
}: CTButtonProps) => {

  if (buttonType === "secondary") {
    return (
      <button
        {...rest}
        type={type}
        disabled={isLoading || rest.disabled}
        className={`h-10 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700
        ring-1 ring-gray-300 cursor-pointer ${rest.className} rounded bg-white outline-none 
        transition-all disabled:brightness-90 disabled:cursor-not-allowed disabled:ring-0
        hover:bg-gray-50 focus:ring-blue-500/50`}
      >
        {isLoading ? (
          <LoaderCircle className="size-5 animate-spin text-gray-700" />
        ) : (
          <>
            {text && <>{text}</>}
            {icon && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  }

  if (buttonType === "primary") {
    return (
      <button
        {...rest}
        type={type}
        disabled={isLoading || rest.disabled}
        className={`h-10 ${rest.className} rounded flex items-center justify-center gap-2 text-sm 
        font-medium text-white bg-blue-600 outline-none hover:bg-blue-700 transition-all
        focus:ring-1 focus:ring-blue-500/50 cursor-pointer 
        disabled:brightness-90 disabled:cursor-not-allowed disabled:ring-0`}
      >
        {isLoading ? (
          <LoaderCircle className="size-5 animate-spin text-white" />
        ) : (
          <>
            {text && <>{text}</>}
            {icon && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      {...rest}
      type={type}
      disabled={isLoading || rest.disabled}
      className={`text-sm text-gray-700 font-medium flex items-center justify-center gap-1
      focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer ${rest.className} 
      rounded transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none`}
    >
      {isLoading ? (
        <LoaderCircle className="size-5 animate-spin text-gray-700" />
      ) : (
        <>
          {text && <>{text}</>}
          {icon && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default UiButton;
