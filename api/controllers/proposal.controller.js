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
export const getAllProposal = async (req, res, next) => {
  try {
    const { email } = req.query;
    const listing = await Proposal.find();
    if (!listing || listing.length === 0 ) {
      return next(errorHandler(404, 'No Proposal found'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const acceptProposal = async (req, res, next) => {
  //const { id } = req.params;
  try {
      const { status, budget } = req.body;
      const updatedProposal = await Proposal.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status,budget:budget
          },
        },
        { new: true }
      );
      //console.log(updatedProposal);
      if (!updatedProposal) {
          return res.status(404).json({ error: 'Proposal not found' });
      }
      res.status(200).json({ message: 'Proposal accepted successfully', proposal: updatedProposal });
  } catch (error) {
      next(error);
  }
};

export const rejectProposal = async (req, res, next) => {
  try {
    const { status, reason } = req.body;
      const updatedProposal = await Proposal.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status,reason:reason
          },
        },
        { new: true }
      );
      //console.log(updatedProposal);
      if (!updatedProposal) {
          return res.status(404).json({ error: 'Proposal not found' });
      }
      res.status(200).json({ message: 'Proposal accepted successfully', proposal: updatedProposal });
  } catch (error) {
      next(error);
  }
};

export const advCreated = async (req, res, next) => {
  try {
    const { status,advertisement } = req.body;
      const updatedProposal = await Proposal.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status,advertisement:advertisement
          },
        },
        { new: true }
      );
      //console.log(updatedProposal);
      if (!updatedProposal) {
          return res.status(404).json({ error: 'Proposal not found' });
      }
      res.status(200).json({ message: 'Advertisement created successfully', proposal: updatedProposal,
    });
  } catch (error) {
      next(error);
  }
};
export const submitSpecification = async (req, res, next) => {
  try {
    const { status, specification } = req.body;
      const updatedProposal = await Proposal.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status,specification:specification
          },
        },
        { new: true }
      );
      //console.log(updatedProposal);
      if (!updatedProposal) {
          return res.status(404).json({ error: 'Proposal not found' });
      }
      res.status(200).json({ message: 'specification accepted successfully', proposal: updatedProposal });
  } catch (error) {
      next(error);
  }
};
export const acceptQuotation = async (req, res, next) => {
  try {
    const { status } = req.body;
      const updatedProposal = await Proposal.findOneAndUpdate(
        {_id:req.params.id},
        {
          $set: {
            status: status
          },
        },
        { new: true }
      );
      //console.log(updatedProposal);
      if (!updatedProposal) {
          return res.status(404).json({ error: 'Proposal not found' });
      }
      res.status(200).json({ message: 'proposal updated successfully', proposal: updatedProposal,
    });
  } catch (error) {
      next(error);
  }
};