import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import  { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import verifyToken from "./middleware/verifyToken.js";

//importing dummy data to be added in Db only once
/* import { users, posts } from "./data/data.js";
import User from "./models/User.js";
import postModel from "./models/Post.js"; */


// Configurations and middlewares
const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
let app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));



// File Storage configuration for pictures 
const storage = multer.diskStorage({
    destination:(req, file, cb) => { 
        cb(null , 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage}); 

// register route
app.post('/auth/register', upload.single('picture'), register );
app.post('/posts', verifyToken,upload.single('picture'), createPost);

// Routes 
app.use('/auth',authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Connecting Database 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('\n\n*******************DB Connected*************************'))
  .then(() => {
        app.listen(process.env.PORT, console.log(`listening to port ${process.env.PORT}`));

        //Adding dummy data
      /*   User.insertMany(users);
        postModel.insertMany(posts); */
    })
  .catch((err) => {
        console.log("Database didn't connect: ",err);  
    })

