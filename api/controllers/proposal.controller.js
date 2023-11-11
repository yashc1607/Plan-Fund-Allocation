import Proposal from "../models/proposal.model.js";
import { errorHandler } from '../utils/error.js';

export const uploadProposal = async (req, res, next) => {
    const {name,email,budget,unitPrice,quantity,description,status,reason}=req.body;
    const newReq=new Proposal({name,email,budget,unitPrice,quantity,description,status,reason});

    try{
        await newReq.save()
        res.status(201).json("Request initiated successfully");
    } catch(error){
        next(error);
    } 
};

export const getProposal = async (req, res, next) => {
  try {
    const { email } = req.query;
    const listing = await Proposal.find({ email });
    if (!listing || listing.length === 0 ) {
      return next(errorHandler(404, 'No Proposal found'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};