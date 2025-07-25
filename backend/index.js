import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import methodOverride from "method-override";
import path from "path";
dotenv.config({});

const app = express();

const _dirname = path.resolve();
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//All api's

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.use(express.static(path.join(_dirname, "frontend", "dist")));


app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, (req, res) => {
    connectDB();
    console.log(`Server is listening to port ${PORT}`);
})

