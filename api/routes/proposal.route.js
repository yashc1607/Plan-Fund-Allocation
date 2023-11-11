import express from 'express';
import { uploadProposal,getProposal } from '../controllers/proposal.controller.js';
const proposalRouter = express.Router();
proposalRouter.post("/uploadProposal",uploadProposal);
proposalRouter.get("/getProposal",getProposal);
export default proposalRouter;