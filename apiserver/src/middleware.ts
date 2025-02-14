import express, { Request, Response, NextFunction } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    req.isAuthenticated() ? next() : res.sendStatus(403)
}

export const logoutMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    req.logout ? req.logout((error) => error ? next(error) : req.session.destroy(() => next())) : next();
}
