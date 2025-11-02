import { ArrowRight, DollarSign } from "lucide-react";
import UiModalContainer from "../../../components/UiModal";
import { FormProvider, useForm } from "react-hook-form";
import UiTextInput from "../../../components/UiTextInput";
import UiButton from "../../../components/UiButton";
import { useSingleTranscationServices } from "../../../services/hooks/useTranscationServices";
import { useEffect } from "react";

interface IAddEditTranscationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  formSubmitHandler: (data: any) => void;
  formLoading: boolean;
  editTranscationId?: string | null;
}

const AddEditTranscationModal = ({
  isOpen,
  handleClose,
  formSubmitHandler,
  formLoading,
  editTranscationId,
}: IAddEditTranscationModalProps) => {
  const formMethods = useForm();

  const {
    services: { getSingleTranscationService },
  } = useSingleTranscationServices({
    transcationId: String(editTranscationId),
    enableQuery: editTranscationId ? true : false,
  });

  useEffect(() => {
    if (getSingleTranscationService?.data?.transaction) {
      formMethods.reset({
        id: getSingleTranscationService?.data?.transaction?._id,
        type: getSingleTranscationService?.data?.transaction?.type,
        amount: getSingleTranscationService?.data?.transaction?.amount,
        description:
          getSingleTranscationService?.data?.transaction?.description,
        category: getSingleTranscationService?.data?.transaction?.category,
        date: getSingleTranscationService?.data?.transaction?.date
      });
    }
  }, [getSingleTranscationService?.data?.transaction]);

  return (
    <UiModalContainer
      handleCloseModal={handleClose}
      isOpen={isOpen}
      headSection={
        <div className="flex items-start gap-4  ">
          <section className="w-8 h-8 p-1 text-red-400 flex  items-center justify-center rounded-full shadow-md">
            <DollarSign className="size-4" />
          </section>
          <section className="leading-5">
            <h2 className="text-md font-semibold text-heading">
              Add / Edit Expense
            </h2>
            <p className="text-sm font-normal text-darkGray">
              Add a new Expense to the database
            </p>
          </section>
        </div>
      }
    >
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(formSubmitHandler)}
          className="flex flex-col gap-4 w-[500px]"
        >
          <UiTextInput
            name="type"
            label="Type"
            placeholder="Eg: income or expense"
            registerOptions={{
              required: "Type is required",
            }}
          />

          <UiTextInput
            name="amount"
            label="Amount"
            placeholder="Eg: 500"
            registerOptions={{
              required: "amount is required",
            }}
          />

          <UiTextInput
            name="description"
            label="Description"
            placeholder="Eg Buy Clothes"
            registerOptions={{
              required: "Description is required",
            }}
          />

          <UiTextInput
            name="category"
            label="Category"
            placeholder="Eg:salary, groceries, entertainment"
            registerOptions={{
              required: "Description is required",
            }}
          />

          <UiTextInput
            name="date"
            label="Date"
            placeholder="Eg: 2024/11/01"
            registerOptions={{
              required: "Date is required",
            }}
          />

          <section className="flex items-center gap-2 mt-2">
            <UiButton
              buttonType="secondary"
              text="Cancel"
              className="w-full"
              onClick={handleClose}
            />
            <UiButton
              isLoading={formLoading}
              type="submit"
              text="Submit"
              icon={<ArrowRight className="size-4" />}
              className="w-full"
            />
          </section>
        </form>
      </FormProvider>
    </UiModalContainer>
  );
};

export default AddEditTranscationModal;
