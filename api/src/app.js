import express from "express";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //"http://localhost:3000"); // update to match the domain you will make the reque from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

export default server;
