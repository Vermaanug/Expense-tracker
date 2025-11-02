/** @format */

import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import UiButton from "./UiButton";

type ModalWrapperProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  isLoading?: boolean;
  z_index?: string;
  headSection?: React.ReactNode;
  containerClass?: string;
  children: React.ReactNode;
  disableCloseButton?: boolean;
  LoaderComponent?: React.ReactNode;
};

const DefaultLoaderComponent = (
  <div className="flex items-center justify-center bg-gray-100 animate-pulse w-full rounded h-72" />
);

const UiModalContainer = ({
  isOpen,
  isLoading,
  headSection,
  containerClass,
  children,
  disableCloseButton,
  handleCloseModal,
  z_index = "z-50",
  LoaderComponent = DefaultLoaderComponent,
}: ModalWrapperProps) => {
  return (
    <Dialog
      as="div"
      className="relative z-50 focus:outline-none"
      open={isOpen}
      onClose={handleCloseModal}
    >
      
      <div className={`fixed inset-0 ${z_index} w-screen overflow-y-auto backdrop-blur-sm`} />
      <div className={`fixed inset-0 ${z_index} w-screen bg-gray-800/50 overflow-y-auto`}>
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <DialogPanel
            transition
            className={`relative bg-white rounded-lg px-6 py-6 flex flex-col gap-4 shadow-xl border-b-4 border-blue-600 
            duration-100 ease-in data-[closed]:scale-50 data-[closed]:opacity-0 ${containerClass}`}
          >
           
            <section className="flex items-start justify-between gap-8">
              {headSection}
              {!disableCloseButton && (
                <UiButton
                  className="absolute top-6 right-6 focus:ring-blue-500 focus:bg-blue-100 text-gray-700"
                  icon={<X className="size-5" />}
                  buttonType="tertiary"
                  onClick={handleCloseModal}
                  disabled={disableCloseButton}
                />
              )}
            </section>

          
            {isLoading ? LoaderComponent : children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UiModalContainer;
