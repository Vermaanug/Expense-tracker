import { useMutation } from "@tanstack/react-query";
import { useTranscationServices } from "../../../services/hooks/useTranscationServices";
import {
  handleGlobalDeleteRequest,
  handleGlobalPostRequest,
  handleGlobalPutRequest,
} from "../../../services/function/globalApifunction";
import { CORE_URLS } from "../../../services/URLS/CORE_URLS";
import { useState } from "react";
import { toast } from "react-toastify";

interface ITranscationSubmitSchema {
  id?: string;
  type: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}

const useExpenseTracker = () => {
  const [isTranscationModalOpen, toggleIsTranscationModalOpen] =
    useState(false);
  const [editTranscationId, setEditTranscationId] = useState<string | null>(
    null
  );

  const {
    services: { getAllTranscationService },
  } = useTranscationServices({});

  const addTranscationMutation = useMutation({
    mutationFn: (data: ITranscationSubmitSchema) =>
      handleGlobalPostRequest({
        url: `${CORE_URLS.SAVE_TRANSCATION}`,
        data,
      }),
    // onError: (error) => {
    //   handleNetworkError({ error });
    // },
  });

  const updateTranscationMutation = useMutation({
    mutationFn: (data: ITranscationSubmitSchema) =>
      handleGlobalPutRequest({
        url: `${CORE_URLS.UPDATE_TRANSCATION}/${data.id}`,
        data,
      }),
    // onError: (error) => {
    //   handleNetworkError({ error });
    // },
  });
  const deleteTranscationMutation = useMutation({
    mutationFn: (id: string) =>
      handleGlobalDeleteRequest({
        url: `${CORE_URLS.DELETE_TRANSCATION}/${id}`,
      }),
    // onError: (error) => {
    //   handleNetworkError({ error });
    // },
  });

  const handleAddEditTranscation = (data: ITranscationSubmitSchema) => {
    const dataObject: ITranscationSubmitSchema = {
      ...(data?.id && { id: data.id }),
      type: data.type,
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    };

    if (data.id) {
      updateTranscationMutation.mutateAsync(dataObject).then(() => {
        getAllTranscationService.refetch();
        toast.success("Transcation Updated Sucessfulluy");
        toggleIsTranscationModalOpen(false);
      });
    } else {
      addTranscationMutation.mutateAsync(dataObject).then(() => {
        getAllTranscationService.refetch();
        toast.success("Transcation Added Sucessfulluy");
        toggleIsTranscationModalOpen(false);
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteTranscationMutation.mutateAsync(id).then(() => {
      toast.success("Transcation Deleted Sucessfulluy");
      getAllTranscationService.refetch();
    });
  };

  return {
    services: {
      getAllTranscationService,
    },
    mutations: {
      addTranscationMutation,
      updateTranscationMutation,
      deleteTranscationMutation,
    },
    handlers: {
      handleAddEditTranscation,
      handleDelete,
    },
    states: {
      isTranscationModalOpen,
      toggleIsTranscationModalOpen,
      setEditTranscationId,
      editTranscationId,
    },
  };
};

export default useExpenseTracker;
