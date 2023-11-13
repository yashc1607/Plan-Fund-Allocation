import express from 'express';
import { uploadProposal,getProposal,acceptProposal,rejectProposal,getAllProposal,submitSpecification,advCreated} from '../controllers/proposal.controller.js';
const proposalRouter = express.Router();
proposalRouter.post("/uploadProposal",uploadProposal);
proposalRouter.get("/getProposal",getProposal);
proposalRouter.get("/getAllProposal",getAllProposal);
proposalRouter.post('/acceptProposal/:id', acceptProposal);
proposalRouter.post('/rejectProposal/:id', rejectProposal);
proposalRouter.post('/submitSpecification/:id', submitSpecification);
proposalRouter.post('/advCreated/:id', advCreated);
export default proposalRouter;

