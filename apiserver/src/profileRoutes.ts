import express, { Router, Response, Request, NextFunction } from "express";
import * as models from "./models"
import * as middleware from "./middleware"
import profileDatabase, { Query, QueryResult } from "./database"

export default (): Router => {
    const profileRouter = express.Router();

    //Get My Profile
    profileRouter.get("/", middleware.isAuthenticated, getProfileMeHandler)
    //Get All Profiles
    profileRouter.get("/common", middleware.isAuthenticated, getProfileCommonHandler)
    //Get Specific Profile
    profileRouter.get("/:id", middleware.isAuthenticated, getProfileByIdHandler)
    return profileRouter;

};

const getProfileMeHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send("Not Authenticated")
    }
    const user = req.user as models.User;
    
    const query: Query = {
        database: "API",
        provider: "MONGOCLIENT",
        collection: "USERS",
        method: "FIND1",
        filter: { accountEmail: user.accountEmail },
            filterOptions: {_id: 0},
    }
    const results: QueryResult = await profileDatabase(query)
    if (!results.status) {
        res.status(500).send("Error in Profile List")
        return
    }   
    
    
    
    res.status(200).json(results?.results[0] || {})
}

const getProfileByIdHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send("Not Authenticated")
    }
    const user = req.user as models.User;
    
    const query: Query = {
        database: "API",
        provider: "MONGOCLIENT",
        collection: "USERS",
        method: "FIND1",
        filter: { profileID: req.params.id },
            filterOptions: {_id: 0},
    }
    const results: QueryResult = await profileDatabase(query)
    if (!results.status) {
        res.status(500).send("Error in Profile List")
        return
    }   
    
    
    
    res.status(200).json(results?.results[0] || {})
}

const getProfileCommonHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send("Not Authenticated")
    }
    const user = req.user as models.User;
    const groupNames: string[] = user.groups.map(g => g.group);
 console.log ("User: ",user) 
    const query: Query = {
        database: "API",
        provider: "MONGOCLIENT",
        collection: "USERS",
        method: "FINDX",
        filter: { "groups.group": { $in: groupNames } },
            filterOptions: {_id: 0},
    }
    const results: QueryResult = await profileDatabase(query)
    if (!results.status) {
        res.status(500).send("Error in Profile List")
        return
    }   
    
    
    
    res.status(200).json(results.results)
}
