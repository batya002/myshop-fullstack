import express from "express";
import morgan from "morgan";
import cros from "cors";
import userRouter from "../routes/usersRoute.js";
import productRouter from "../routes/productsRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cros({ origin: "http://localhost:5173" }));
app.use("/api", userRouter, productRouter);

app
  .listen(PORT, () => console.log(`Create server in ${PORT} port`))
  .on("error", (err) => console.error(`Error in runig server: ${err.message}`));
