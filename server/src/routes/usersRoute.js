import {
  createUser,
  getUsers,
  deleteUser,
  editUser,
  getUser,
} from "../controller/usersControl.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.get("/users/:id", getUser)

userRouter.post("/users", createUser);

userRouter.delete("/users/:id", deleteUser);

userRouter.patch("/users/:id", editUser);

export default userRouter;
