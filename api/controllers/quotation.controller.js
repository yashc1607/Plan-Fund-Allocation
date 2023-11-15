import Quotation from '../models/quotation.model.js';
import { errorHandler } from '../utils/error.js';

export const uploadQuotation = async (req, res, next) => {
    const {email,name,status,description,budget,other,advId,specification}=req.body;
    const newReq=new Quotation({email,name,status,description,budget,other,advId,specification});
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
export const getAllQuotation = async (req, res, next) => {
  try {
    const listing = await Quotation.find();
    if (!listing || listing.length === 0 ) {
      return next(errorHandler(404, 'No Quotation found'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const acceptQuotation = async (req, res, next) => {
  //const { id } = req.params;
  try {
      const { status } = req.body;
      const updatedQuotation = await Quotation.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status
          },
        },
        { new: true }
      );
      //console.log(updatedQuotation);
      if (!updatedQuotation) {
          return res.status(404).json({ error: 'Quotation not found' });
      }
      res.status(200).json({ message: 'Quotation accepted successfully', Quotation: updatedQuotation });
  } catch (error) {
      next(error);
  }
};

export const rejectQuotation = async (req, res, next) => {
  //const { id } = req.params;
  try {
      const { status } = req.body;
      const updatedQuotation = await Quotation.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status  
          },
        },
        { new: true }
      );
      //console.log(updatedQuotation);
      if (!updatedQuotation) {
          return res.status(404).json({ error: 'Quotation not found' });
      }
      res.status(200).json({ message: 'Quotation rejected successfully', Quotation: updatedQuotation });
  } catch (error) {
      next(error);
  }
};

export const rejectAllQuotation = async (req, res, next) => {
  //const { id } = req.params;
  try {
      const { advId } = req.body;
      const updatedQuotation = await Quotation.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status,budget:budget
          },
        },
        { new: true }
      );
      //console.log(updatedQuotation);
      if (!updatedQuotation) {
          return res.status(404).json({ error: 'Quotation not found' });
      }
      res.status(200).json({ message: 'Quotation rejected successfully', Quotation: updatedQuotation });
  } catch (error) {
      next(error);
  }
};

export const deliveredQuotation = async (req, res, next) => {
  //const { id } = req.params;
  try {
      const { status } = req.body;
      const updatedQuotation = await Quotation.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status
          },
        },
        { new: true }
      );
      //console.log(updatedQuotation);
      if (!updatedQuotation) {
          return res.status(404).json({ error: 'Quotation not found' });
      }
      res.status(200).json({ message: 'Quotation accepted successfully', Quotation: updatedQuotation });
  } catch (error) {
      next(error);
  }
};