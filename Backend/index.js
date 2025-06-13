import dotenv from 'dotenv'

dotenv.config();
import express from 'express'
import database from './database/database.js';
import cookieParser from 'cookie-parser'
import router from './Routes/Route.js';
import { payment } from './Controllers/Payment.js';
import cors from 'cors'
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors({
    origin: process.env.VITE_API_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  
app.use('/api', router);

const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if (err) return console.log('Server Not Connected : ');

    console.log(`Server Started : ${port}`);
})