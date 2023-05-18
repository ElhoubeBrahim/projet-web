import { User } from "@prisma/client";
import express from "express";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Add the user to the request objects
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
