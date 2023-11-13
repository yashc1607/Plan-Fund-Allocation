import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import deadlineRouter from './routes/deadline.route.js';
import proposalRouter from './routes/proposal.route.js';
import quotationRouter from './routes/quotation.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose
   .connect(process.env.MONGO)
   .then(()=>{
   console.log('connected to mongoDB!');
   })
   .catch((err) =>{
      console.log(err);
   });
 const app = express();
 app.use(express.json());
 app.use(cookieParser());
 app.listen(3000,() =>{
    console.log('Server is running on port 3000');
   });

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/deadline',deadlineRouter);
app.use('/api/proposal',proposalRouter);
app.use('/api/quotation',quotationRouter);
app.use((err,req,res,next)=>{
   const statusCode = err.statusCode||500;
   const message=err.message||'Internal Server Error';
   return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
   });
});