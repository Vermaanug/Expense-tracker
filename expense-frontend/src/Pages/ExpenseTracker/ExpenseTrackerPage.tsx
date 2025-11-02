import type { ColumnDef } from "@tanstack/react-table";
import UiTable from "../../components/UiTable";
import useExpenseTracker from "./hooks/useExpenseTracker";
import type { ITranscationResponseSchema } from "../../services/hooks/useTranscationServices";
import UiButton from "../../components/UiButton";
import { Pencil, PlusCircleIcon, Trash } from "lucide-react";
import AddEditTranscationModal from "./component/AddEditTranscation";

const ExpenseTrackerPage = () => {
  const {
    services: { getAllTranscationService },
    mutations: {
      addTranscationMutation,
      updateTranscationMutation,
    },
    states: {
      isTranscationModalOpen,
      toggleIsTranscationModalOpen,
      setEditTranscationId,
      editTranscationId,
    },
    handlers: { handleAddEditTranscation, handleDelete },
  } = useExpenseTracker();

  const columnsSchema: ColumnDef<ITranscationResponseSchema>[] = [
    {
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-gray-500">#{row.index + 1}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ cell }) => (
        <span className="font-semibold text-gray-900">
          {String(cell.getValue())}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ cell }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {String(cell.getValue())}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ cell }) => (
        <span className="text-gray-600">{String(cell.getValue())}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ cell }) => (
        <span className="text-gray-900 font-medium">
          {String(cell.getValue())}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ cell }) => {
        const rawDate = cell.getValue() as string;

        const formattedDate = rawDate
          ? new Date(rawDate).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : "—";
        return <span className="text-gray-600">{formattedDate}</span>;
      },
    },
    {
      header: "Actions",
      cell: (cell) => {
        const rowData = cell.row.original;
        return (
          <div className="flex items-center gap-4">
            <UiButton
              buttonType="tertiary"
              icon={<Pencil className="size-4" />}
              onClick={() => {
                toggleIsTranscationModalOpen(true);
                setEditTranscationId(rowData?._id);
              }}
            />

            <UiButton
              buttonType="tertiary"
              className="px-1"
              icon={<Trash className="size-4 text-red-400" />}
              onClick={() => {
               handleDelete(rowData?._id)
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col p-6 gap-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-800">
          Expense Tracker
        </h1>
        <span className="text-base text-gray-500">
          Master to Keep Track of expense
        </span>
      </div>
      <UiTable
        tableData={getAllTranscationService || []}
        columnsSchema={columnsSchema}
        actionButtonComponent={
          <UiButton
            text="Add Transcation"
            icon={<PlusCircleIcon className="size-4" />}
            className="px-3 h-8 flex-row-reverse"
            onClick={() => {
              toggleIsTranscationModalOpen(true);
            }}
          />
        }
      />
      {isTranscationModalOpen ? (
        <AddEditTranscationModal
          editTranscationId={editTranscationId}
          formSubmitHandler={handleAddEditTranscation}
          formLoading={
            addTranscationMutation.isPaused ||
            updateTranscationMutation?.isPaused
          }
          handleClose={() => {
            toggleIsTranscationModalOpen(false);
          }}
          isOpen={isTranscationModalOpen}
        />
      ) : null}
    </div>
  );
};

export default ExpenseTrackerPage;
