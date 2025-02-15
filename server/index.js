const express = require("express");
const app = express();

require("dotenv").config();
PORT=process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
const cors= require("cors");
const {cloudinaryConnect}= require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// middlewares
app.use(express.json());// accessing the values from the request body
app.use(cookieParser());
app.use(
    cors({
        origin:"https://ednexx-3t62.vercel.app/",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connect
cloudinaryConnect();

const dbconnect= require("./config/database"); // accessing the database 
dbconnect();

const userRoutes= require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is Up and Running.."
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running successfully at ${PORT}`);
})

