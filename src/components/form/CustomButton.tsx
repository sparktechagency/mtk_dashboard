import type React from "react";
import { CgSpinnerTwo } from "react-icons/cg";



type TProps = {
    isLoading: boolean;
    onClick: ()=> void;
    children: React.ReactNode;
    loadingTitle?: string;
    disabled?: boolean;
}

const CustomButton = ({ isLoading, loadingTitle="Processing...", onClick, children, disabled=false }: TProps) => {
    return (
        <>
            <button
                onClick={onClick}
                type="button"
                disabled={isLoading || disabled}
                 className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        {loadingTitle}
                    </>
                ) : (
                    <>
                      {children}
                    </>
                )}
            </button>
        </>
    )
}

export default CustomButton