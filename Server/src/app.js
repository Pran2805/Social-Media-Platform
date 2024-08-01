import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

import postRoutes from "./routes/post.routes.js";
app.use('/api', postRoutes);

export {app}