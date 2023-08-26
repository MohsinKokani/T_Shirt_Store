import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import connectDB from './db/connectdb.js';
import tshirtRoutes from './routes/tshirtRoute.js';
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import bodyparser from "body-parser";
import fileUpload from "express-fileupload";
import cartRoute from "./routes/cartRoute.js";

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

config();

const app = express();
const PORT = process.env.PORT || 3001;
const DBlink = process.env.MONGO_CONNECT_LINK;

connectDB(DBlink);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_SECRET,
    api_secret: process.env.CLOUDINARY_API_KEY
})

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors())
app.use('*', cors({
    origin: true,
    credentials: true,
}));

// app.use(cors({
//     origin: true,
//     credentials: true,
// }));
// app.options('*', cors(corsConfig));
// app.use(cors({ origin: true, credentials: true }))
app.use('/tshirt', tshirtRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);


app.get('/', (req, res) => {
    res.send('hello world this my backend and i am gonna rock it')

})

app.listen(PORT, () => {
    console.log(`listening at port http://localhost:${PORT}`);
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});