import mongoose from 'mongoose';

const proposalSchema=new mongoose.Schema({
    name:{
        type:String, required:true,
   },
    email:{
        type:String, required:true,
   },
   budget:{
       type:Number, 
   },
   unitPrice:{
       type:Number, 
   },
   quantity:{
       type:Number,
   },
   description:{
       type:String,
   },
   status:{
       type:String,
   },
   reason:{
       type:String,
   },
   specificationFile: {
    data: Buffer, 
    contentType: String,
    filename: String, 
  },

},{timestamps:true});

const Proposal=mongoose.model('Proposal',proposalSchema);

export default Proposal;