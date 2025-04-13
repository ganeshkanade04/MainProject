import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: '50mb',
}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,//url data understand 
}));
app.use(express.static('public'));//for static files in my public folder
app.use(cookieParser());//for cookies


export default app;