import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import router from './Routes/auth.js';
import morgan from "morgan";
import Connection from './DB/db.js'

dotenv.config();


const PORT=process.env.PORT 
const username=process.env.USER_NAME
const password=process.env.PASSWORD

const app=express();

// Middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
Connection(username,password);

// Router
app.use('/', router)


app.listen(PORT, ()=>console.log(`Server is running at PORT: ${PORT}`) )