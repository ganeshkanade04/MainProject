import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//import routes

import { router } from './routes/user.routes.js';


//declare routes

app.use('/api',router);

app.get('/a',(req,res)=>{
    res.send('hello world');
    console.log("Ganesh")
})

export {app};
