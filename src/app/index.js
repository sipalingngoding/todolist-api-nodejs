import express from "express";
import {todoRoute, userRoute} from "../route/index.js";
import errorMiddleware from "../middleware/errorMiddleware.js";
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/users',userRoute);

app.use('/todolist',todoRoute);

app.use(errorMiddleware);

app.use((req,res)=>{
    res.status(404).json({
        status : 'fail',
        message :'Route Not Found'
    });
});

export default app;
