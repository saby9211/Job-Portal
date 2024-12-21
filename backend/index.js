import express from "express";
import cookieParser from "cookie-parser"; // so that we can access our cookies stored in browser at backend
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});

const app = express();




// middlewares
app.use(express.json()); // because our request comes as json format
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http//localhost:5173', // host of frontend
    credentials:true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's 
app.use("/api/v1/user", userRoute)

// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});

