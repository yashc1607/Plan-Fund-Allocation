import express from 'express';
import { setDeadline,getDeadline } from '../controllers/deadline.controller.js';
const deadlineRouter = express.Router();
deadlineRouter.post("/setDeadline",setDeadline);
deadlineRouter.get("/getDeadline",getDeadline);
export default deadlineRouter;