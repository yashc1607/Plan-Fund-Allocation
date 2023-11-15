import express from 'express';
import { uploadProposal,getProposal,acceptProposal,rejectProposal,getAllProposal,submitSpecification,advCreated,acceptQuotation} from '../controllers/proposal.controller.js';
const proposalRouter = express.Router();
proposalRouter.post("/uploadProposal",uploadProposal);
proposalRouter.get("/getProposal",getProposal);
proposalRouter.get("/getAllProposal",getAllProposal);
proposalRouter.post('/acceptProposal/:id', acceptProposal);
proposalRouter.post('/rejectProposal/:id', rejectProposal);
proposalRouter.post('/submitSpecification/:id', submitSpecification);
proposalRouter.post('/advCreated/:id', advCreated);
proposalRouter.post('/acceptQuotation/:id', acceptQuotation);
proposalRouter.post('/deliveredQuotation/:id', deliveredQuotation);
export default proposalRouter;

