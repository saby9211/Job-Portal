import express from "express";
import cookieParser from "cookie-parser"; // so that we can access our cookies stored in browser at backend
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"


dotenv.config({});

const app = express();




// middlewares
app.use(express.json()); // because our request comes as json format
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://rojgaar-khojo.vercel.app/',            // for local development
  'https://rojgaar-khojo-85lbffmnw-supreet-singhs-projects-07b25701.vercel.app/',
  'https://rojgaar-khojo-pbcxgv438-supreet-singhs-projects-07b25701.vercel.app/' // for production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// const corsOptions = {
//     origin:'http://localhost:5173', // host of frontend
//     credentials:true
// };

// app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});

