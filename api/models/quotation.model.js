import mongoose from 'mongoose';

const quotationSchema=new mongoose.Schema({
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
   other: {
    type:String,
  },
  advId: {
    type:String,
  },

},{timestamps:true});

const Quotation=mongoose.model('Quotation',quotationSchema);

export default Quotation;