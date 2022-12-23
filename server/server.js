import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./config/db.js";
import sockets from './socket/routes/routes.js';
import errorHandler from "./middleware/errorHandler.js"

connectDB()

const PORT = process.env.port || 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    allowedHeaders: [],
    credentials: true
  }
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json());

import userRoutes from './routes/UserRoutes.js';
app.use('/api/user',userRoutes)
import roomRoutes from './routes/RoomRoutes.js';
app.use('/api/room',roomRoutes)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", sockets);

app.use(errorHandler)

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
