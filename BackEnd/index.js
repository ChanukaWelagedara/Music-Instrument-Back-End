import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { MusicInstrument } from "./models/musicInstrumentModel.js";
import instrumentRoute from "./routes/instrumentRoute.js";
import userRoute from "./routes/userRoutes.js"; 
import cartRoute from "./routes/cartRoutes.js"
import cors from 'cors';
import cookieParser from "cookie-parser";
// const fileUpload = require('express-fileupload');
import fileUpload from "express-fileupload";


const app = express();

app.use(fileUpload());

app.use('/public/item', express.static('public/item'))

app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with the allowed origin
      credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    })
  );
  
app.use(cookieParser());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome');
});

app.use('/instruments', instrumentRoute);
app.use('/users', userRoute);
app.use('/cart', cartRoute);

// Use the user route

mongoose
    .connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('App connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(error => {
        console.error(error);
    });
