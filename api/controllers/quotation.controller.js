import Quotation from '../models/quotation.model.js';
import { errorHandler } from '../utils/error.js';

export const uploadQuotation = async (req, res, next) => {
    const {email,name,status,description,budget,other,advId}=req.body;
    const newReq=new Quotation({email,name,status,description,budget,other,advId});
    try{
        await newReq.save()
        res.status(201).json("Request initiated successfully");
    } catch(error){
        next(newReq);
    } 
};
export const getQuotation = async (req, res, next) => {
    try {
      const { email } = req.query;
      const listing = await Quotation.find({ email });
      if (!listing || listing.length === 0 ) {
        return next(errorHandler(404, 'No Quotation found'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
};