import mongoose from 'mongoose';

const deadlineSchema=new mongoose.Schema({
   deadlinetype:{
    type:String,
   },
   date:{
    type:String,
   },
   requestflag:{
    type:Boolean, default:false,
   },
},{timestamps:true});

const Deadline=mongoose.model('Deadline',deadlineSchema);

export default Deadline;