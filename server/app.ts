import express, { Request, Response } from "express";
import router from "./routes";
const app = express();
const port = process.env.PORT || 8000;

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
