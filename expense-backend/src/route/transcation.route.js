import express from "express"
import { deleteTranscation, getAllTranscations, getTranscationById, saveTranscation, updateTranscation } from "../controllers/transcation.controller.js";

const transcationRouter = express.Router();

transcationRouter.get("/", getAllTranscations)
transcationRouter.get("/:id", getTranscationById)
transcationRouter.post("/save", saveTranscation)
transcationRouter.delete("/delete/:id", deleteTranscation)
transcationRouter.put("/update/:id", updateTranscation)



export default transcationRouter;