import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';


//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors(
  {
    origin: ["http://localhost:3000", "https://paws-to-whiskers-ecommerce-backend.onrender.com"],
    credentials: true,
  }
));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.get("/", (req,res) => {
    res.send ("<h1> Welcome to Paws To Whiskers website </h1>");
} );

//PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log (`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});

//image cache
app.use('/uploads', express.static('uploads', {
  maxAge: '1y', // cache images for 1 year
  etag: false,
}));