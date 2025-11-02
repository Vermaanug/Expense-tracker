import express from "express"
import { deleteTranscation, getAllTranscations, getTranscationById, saveTranscation, updateTranscation } from "../controllers/transcation.controller.js";

const transcationRouter = express.Router();

transcationRouter.get("/", getAllTranscations)
transcationRouter.get("/:id", getTranscationById)
transcationRouter.post("/save", saveTranscation)
transcationRouter.put("/update/:id", updateTranscation)
transcationRouter.delete("/delete/:id", deleteTranscation)




export default transcationRouter;