import express, { Router, Response, Request, NextFunction } from "express";
import * as models from "./models"
import * as middleware from "./middleware"

export default (auth: models.AuthenticationReturn): Router => {
    const authRouter = express.Router();

    // Public Endpoints

    // Status
    authRouter.get("/status", (req: Request, res: Response) => {
        req.isAuthenticated() ? res.sendStatus(200) : res.sendStatus(401)
    });
    // Logout 
    authRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
        req.logout ? req.logout((error) => error ? next(error) : req.session.destroy(() => res.sendStatus(200))) : res.sendStatus(200);
    });

    // Protected Endpoints

    // Local Login Endpoint  User POSTS data to this endpoint to login
    authRouter.post("/local", auth.local, middleware.logoutMiddleWare, (req: Request, res: Response) => {
        res.sendStatus(204) // Success, but No Content
    });
    // Google Login Endpoint and Callback
    authRouter.get("/google", middleware.logoutMiddleWare, auth.google);
    authRouter.get("/google/redirect", auth.google, (req: Request, res: Response) => {
        res.sendStatus(204) // Success, but No Content
    });
    // discord Login Endpoint and Callback
    authRouter.get("/discord", middleware.logoutMiddleWare, auth.discord);
    authRouter.get("/discord/redirect", auth.discord, (req: Request, res: Response) => {
        res.sendStatus(204) //Success, but No Content
    });


    return authRouter
}