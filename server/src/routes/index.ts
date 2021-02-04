import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import follow from "./follow";

// route gateway
const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/follow", follow);

export default routes;
