import express, { Router, Response, Request, NextFunction } from "express";
import * as models from "./models"
import * as middleware from "./middleware"


export default (): Router => {
    const userRouter = express.Router();

    userRouter.get("/", middleware.isAuthenticated, getHomeHandler)
    return userRouter;

};

const getHomeHandler = (req: Request, res: Response) => {
    res.status(200).send("User List")
}
