import TranscationModel from "../model/TranscationModel.js";
import { validatePartialTranscationData } from "../utils/validatePartialTranscationData.js";
import { validateTranscationData } from "../utils/validateTranscationData.js";
import mongoose from "mongoose";

export const saveTranscation = async (req, res) => {
  try {
    const { isValid, errors } = validateTranscationData(req);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "InValid Data",
        errors,
      });
    }

    const { type, amount, description, category, date } = req.body;

    const newTranscation = new TranscationModel({
      type,
      amount,
      description,
      category,
      date,
    });

    await newTranscation.save();

    return res.status(201).json({
      success: true,
      message: "Transcation Save successfully",
      Transcation: newTranscation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTranscation = async (req, res) => {
  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID format",
      });
    }

    const allowedFields = ["type", "amount", "description", "category", "date"];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const { isValid, errors } = validatePartialTranscationData(updateData);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid update data",
        errors,
      });
    }

    const updatedTranscation = await TranscationModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedTranscation) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updatedTranscation,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTranscation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTranscation = await TranscationModel.findByIdAndDelete(id);

    if (!deletedTranscation) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllTranscations = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;   
    const per_page = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * per_page;

    const transactions = await TranscationModel.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(per_page);

    return res.status(200).json({
      success: true,
      data: [...transactions],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTranscationById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await TranscationModel.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
  
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
