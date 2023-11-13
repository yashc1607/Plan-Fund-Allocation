import express from 'express';
import { uploadQuotation,getQuotation } from '../controllers/quotation.controller.js';
const quotationRouter = express.Router();
quotationRouter.post("/uploadQuotation",uploadQuotation);
proposalRouter.get("/getQuotation",getQuotation);
export default quotationRouter;