import express from "express"
import mongoose from "mongoose";  
import dotenv from "dotenv"  
import cors from "cors"    
import userRoute from "./routes/userRoute.js"
import multer from "multer"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";




const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname +'/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage })

dotenv.config({ path: path.resolve(__dirname, './.env') });
const app = express();
// app.use(bodyParser.json());
app.use("/uploads",express.static(__dirname+"/uploads")) // it makes the possibility to connect the .env file data to server.js
app.use(cors(), express.json());

app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({limit: "100mb" ,extended: true }));


const PORT = process.env.PORT || 5000;




app.use((req, res, next) => {

  next();
})

app.use("/",upload.single("avatar"), userRoute );




mongoose
  .connect("mongodb+srv://wais:Waisuddin2022@cluster0.rdpa7.mongodb.net/fullstackhopetohand?retryWrites=true&w=majority")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connected and server running on port: , ${PORT}`),
    ),
  )
  .catch((error) => console.log(error));
