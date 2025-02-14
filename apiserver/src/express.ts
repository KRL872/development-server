import express, { Express, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import dotenv from "dotenv"

import authenticateInitialize from "./authenticate-passport-sessions"
import * as models from "./models";
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"

dotenv.config();

const egg = async () => {
    const PORT = process.env.PORT;
    const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN;
    const app: Express = express();

    // Enable JSON parsing
    app.use(express.json())

    // Enable URL encoded String Parsing
    app.use(express.urlencoded({ extended: true }));

    // Enable Parsing of Cookies
    app.use(cookieParser())

    // Enable Cors
    const corsConfig: CorsOptions = {
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true
    }
    const corsMiddleWare = cors(corsConfig)
    app.use(corsMiddleWare);

    // Initialize Authentication Strategy
    const authConfig: models.AuthenticationConfig = {
        database: "API",
        provider: "MONGOCLIENT",
        store: "MONGOSTORE",  //not implemented Yet
        sessionCollection: "SESSIONS",
        userCollection: "USERS"
    }
    const authenticate = await authenticateInitialize(authConfig, app)

    // Public Routes Need for Authentication
    app.use("/auth", authRoutes(authenticate))

    // Private Routes Need to Be Authenticated
    app.use("/users", userRoutes())

    // Backup To Catch All the Extra Requests
    app.all("*", (req: Request, res: Response) => {
        res.sendStatus(404)
    })




    app.listen(PORT, () => {
        console.log(`Api Server Running on Port: ${PORT}`)
    })

}
egg();

