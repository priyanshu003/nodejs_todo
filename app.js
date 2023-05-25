import express from "express";
import userRoute from "./Routes/user.js";
import taskRoute from "./Routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();


app.use(express.json());
app.use(cookieParser());
config({
    path:"./data/config.env",
});

app.use("/api/v1/users",userRoute);
app.use("/api/v1/task",taskRoute);
app.use(cors({
    orgin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
    
}));

app.use("/*",(req,res)=>{
    res.json({
        message:"try again",
    })
});


