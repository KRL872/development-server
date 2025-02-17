import session, { SessionOptions } from "express-session"
import dotenv from "dotenv"
import passport from "passport"
import { Express } from "express"

import { Strategy as DiscordStrategy, StrategyOptions as DiscordStrategyOptions } from "passport-discord"
import { Strategy as GoogleStrategy, StrategyOptions as GoogleStrategyOptions } from "passport-google-oauth20";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest as LocalStrategyOptions } from "passport-local";

import authDatabase, { Query, QueryResult } from "./database"
import * as utils from "./hashing"
import * as models from "./models"
dotenv.config();

export default async (authConfig: models.DatabaseConfig, app: Express): Promise<models.AuthenticationReturn> => {


    const createDiscordStrategyOptions = (): DiscordStrategyOptions => ({
        clientID: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        callbackURL: process.env.DISCORD_REDIRECTURL!,
        scope: ["identify", "email"],
    })

    const createGoogleStrategyOptions = (): GoogleStrategyOptions => ({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CLIENT_REDIRECTURL!,
        scope: ["email", "profile"],
    })

    const createLocalStrategyOptions = (): LocalStrategyOptions => ({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    })

    const createLocalStrategy = (): passport.Strategy => {
        return new LocalStrategy(createLocalStrategyOptions(), async (req, email, password, done) => {

            try {
                const results = await findUserByEmail(email.toLowerCase())
                const user = results.results![0]
                const isValidPassword = await utils.compareHashedPassword(password, user.hashPassword);
                if (!isValidPassword) throw new Error("Invalid password")
                done(null, user);
            } catch (error) {
                done(error);
            }
        })

    }

    const createGoogleStrategy = (): passport.Strategy => {
        return new GoogleStrategy(createGoogleStrategyOptions(), async (accessToken, refreshToken, profile, done) => {
            try {
                const email: string = profile.emails![0].value.toLowerCase()
                const results = await findUserByEmail(email);
                const user = results.results![0]
                done(null, user);
            } catch (error) {
                done(error);
            }
        })
    }

    const createDiscordStrategy = (): passport.Strategy => {
        return new DiscordStrategy(createDiscordStrategyOptions(), async (accessToken, refreshToken, profile, done) => {
            try {

                const email: string = profile.email!.toLowerCase()
                const results = await findUserByEmail(email);
                const user = results.results![0]
                done(null, user);
            } catch (error) {
                done(error);
            }
        })
    }

    const findUserByEmail = async (email: string): Promise<QueryResult> => {
        const findUserQwery: Query = {
            collection: authConfig.userCollection,
            method: "FIND1",
            database: authConfig.database,
            provider: authConfig.provider,
            filter: { accountEmail: email },
            filterOptions: {_id: 0},
            permissionGroups: [
                { group: "users", accessLevel: 100 },
            ]
        }
        return await authDatabase(findUserQwery)
    }
    const findProfileIdByEmail = async (email: string): Promise<QueryResult> => {
       
       
        const findUserQwery: Query = {
            collection: authConfig.userCollection,
            method: "FIND1",
            database: authConfig.database,
            provider: authConfig.provider,
            filter: {accountEmail: email},
            filterOptions: {projection: {profileID: 1, _id: 0}},
            permissionGroups: [
                { group: "users", accessLevel: 100 },
            ]
        }
        const data = await authDatabase(findUserQwery)
        console.log(data)
        return data
    }

    const storeQuery: Query = {
        database: authConfig.database,
        provider: authConfig.provider,
        collection: authConfig.sessionCollection,
        permissionGroups: [],
        filter: {},
        method: "GETSTORE"
    }

    //Get The Store Object
    const result: QueryResult = await authDatabase(storeQuery)

    // initialize sessions 
    const sessionConfig: SessionOptions = {
        secret: process.env.SESSION_SECRET!,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 30,  // 30 minutes
        },
        store: result.store,
    };

    const authSession = session(sessionConfig)
    app.use(authSession)

    // Set up passport serialization
    passport.serializeUser((user: Express.User, done) => {
        done(null, (user as models.User).accountEmail);
    });

    passport.deserializeUser(async (email: string, done) => {
        try {
            const results = await findUserByEmail(email);
            const user = results?.results![0]
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    // Add Strategies To Passport
    passport.use(createLocalStrategy());
    passport.use(createDiscordStrategy());
    passport.use(createGoogleStrategy());

    // Initialize Passport
    app.use(passport.initialize())
    // Initialize Passport to Sessions
    app.use(passport.session())

    return {
        local: passport.authenticate("local"),
        google: passport.authenticate("google"),
        discord: passport.authenticate("discord")
    }

}