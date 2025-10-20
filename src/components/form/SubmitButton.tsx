import type React from "react";
import { CgSpinnerTwo } from "react-icons/cg"

type TProps = {
    isLoading: boolean;
    loadingTitle?: string;
    children: React.ReactNode;
    disabled?: boolean
}

const SubmitButton = ({ isLoading, loadingTitle="Processing...", children, disabled=false}: TProps) => {
  return (
    <>
          <button
              type="submit"
              disabled={isLoading || disabled}
              className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-primary/80 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100 disabled:cursor-not-allowed"
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

export default SubmitButton;