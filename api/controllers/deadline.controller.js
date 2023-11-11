import Deadline from '../models/deadline.model.js';
import { errorHandler } from '../utils/error.js';

export const setDeadline = async (req, res, next) => {
    const {deadlinetype,date,requestflag}=req.body;
    const newReq=new Deadline({deadlinetype,date,requestflag});
    try{
        await newReq.save()
        res.status(201).json("Request initiated successfully");
    } catch(error){
        next(error);
    } 
};
export const getDeadline = async (req, res, next) => {
    try {
      const deadline = await Deadline.findOne();
      if (!deadline) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(deadline);
    } catch (error) {
      next(error);
    }
};
