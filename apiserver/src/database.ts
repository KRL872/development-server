/*
    This is My Database Controller.  It is designed to be a wrapper around multiple database strategies
    using a common query object.  the query will be passed to specific database strategy functions based
    on provider, database and method.  The controller will open all the relevent databases and make the
    connections on it's own. 
    Input: <Query>
    Output: <QueryResult>
    Usage: 
        import database, {Query,QueryResult} from "./controllers/db"
        database(query:Query):Promise<QueryResult>
    

*/
import * as models from "./models"
import dotenv from "dotenv"

dotenv.config();


// Import MongoClient and Strategy
import { MongoClient } from "mongodb";
import { openMongo, closeMongo, testMongo, findMongo, deleteMongo, updateMongo, getStoreMongo } from "./database-mongoClient"

// Import PgClient and Strategy
import { Client as PgClient } from "pg"
import { openPostgres, closePostgres, testPostgres, findPostgres, deletePostgres, updatePostgres, getStorePostgres } from "./database-postgres"

// Import OtherClient and Strategy
//import {OtherClient} from "otherclient"
//import {openOtherClient,closeOtherClient,testOtherClient,findOtherClient,deleteOtherClient,updateOtherClient,getStoreOtherClient} from "../strategies/database-otherclient"

export type client = MongoClient | PgClient | undefined;
// type client = MongoClient | PgClient | OtherClient | underfined

//this is shared accross all references to database
// in essense it's a array of singletons.
// when populated it will looks like this:
//  {"MONGOCLIENT-AUTHORIZEDUSERS":"MongoClient","MONGOCLIENT-USERS":"MongoClient", "POSTGRESCLIENT-PRODUCTS":"PgClient"}
export const connections: Map<string, client> = new Map();



export type QueryResult = {
    status: boolean,    //bad=false,good=true
    error?: string,     //optional  error string for status=false
    results?: Array<any>, //optional results for status=true #TODO: change that any to something more specific
    store?: any
}

export type Query = {
    database: string,
    provider: models.provider, // use the provider type
    collection: string,
    permissionGroups: Array<models.UserPermissions>,
    method: models.method,
    filter: {}

}

// Does the Connection exist in the Array?
const _isOpen = (query: Query): boolean => connections.has(`${query.provider}-${query.database}`);

// Do A Quick Test to See if the Database picked it open and Stable
const _isStable = async (query: Query): Promise<boolean> => {
    if (query.provider === "MONGOCLIENT") return await testMongo(query);
    if (query.provider === "POSTGRESCLIENT") return await testPostgres(query);
    //if (query.provider === "OTHERCLIENT") return await testOtherClient(query);
    return false

}
// Close the connection 
const _close = async (query: Query): Promise<void> => {
    if (query.provider === "MONGOCLIENT") await closeMongo(query);
    if (query.provider === "POSTGRESCLIENT") await closePostgres(query);
    //if (query.provider === "OTHERCLIENT") await closeOtherClient(query);
    return
}

// Check for 3 States:
// Connection Exists AND its tested => return true
// Connection Exists and it fails test => close connection(if possible)
//                                        open new connection =>return true
// Connection Doesn't Exist => open new connection => return
//
const _open = async (query: Query): Promise<boolean> => {
    if (_isOpen(query) && await _isStable(query)) return true;
    if (_isOpen(query) && !(await _isStable(query))) _close(query);
    if ((!_isOpen(query)) && (query.provider === "MONGOCLIENT")) return openMongo(query)
    if ((!_isOpen(query)) && (query.provider === "POSTGRESCLIENT")) return openPostgres(query)
    //if ((!_isOpen(query)) && (query.provider === "OTHERCLIENT")) return openOtherClient(query)      
    if (!_isOpen(query)) {
        console.log(`Database Provider: ${query.provider} Not Implemented`)
        return false;
    }
    return false;
}



export default async (query: Query): Promise<QueryResult> => {

    //make sure the specific database is up and running
    const stabledb = await _open(query)

    //The is the general switcher. I have it based on methods, not providers so we can clearly see if we forgot to inmplement
    // a function to ALL providers.  Visually I beleive it to be easier to implement new commands and providers
    if (stabledb) {
        switch (query.method) {
            case "FIND":
                if (query.provider === "MONGOCLIENT") return findMongo(query);
                if (query.provider === "POSTGRESCLIENT") return findPostgres(query);
                // if (query.provider === "OTHERCLIENT") return findOtherClient(query);
                return { status: false, error: `Database Method: ${query.method} Not Implemented For Provider: ${query.provider}` }
            case "DELETE":
                if (query.provider === "MONGOCLIENT") return deleteMongo(query);
                if (query.provider === "POSTGRESCLIENT") return deletePostgres(query);
                // if (query.provider === "OTHERCLIENT") return deleteOtherClient(query);
                return { status: false, error: `Database Method: ${query.method} Not Implemented For Provider: ${query.provider}` }
            case "UPDATE":  // Does Both Create OR Update 
                if (query.provider === "MONGOCLIENT") return updateMongo(query);
                if (query.provider === "POSTGRESCLIENT") return updatePostgres(query);
                // if (query.provider === "OTHERCLIENT") return updateOtherClient(query);
                return { status: false, error: `Database Method: ${query.method} Not Implemented For Provider: ${query.provider}` }
            case "GETSTORE":
                if (query.provider === "MONGOCLIENT") return getStoreMongo(query);
                if (query.provider === "POSTGRESCLIENT") return getStorePostgres(query);
                // if (query.provider === "OTHERCLIENT") return getStoreOtherClient(query);
                return { status: false, error: `Database Method: ${query.method} Not Implemented For Provider: ${query.provider}` }

            // case "NEWCOMMAND":
            //     if (query.provider === "MONGOCLIENT") return commandMongo(query);
            //     if (query.provider === "POSTGRESCLIENT") return commandPostgres(query);
            //     // if (query.provider === "OTHERCLIENT") return commandOtherClient(query);
            //     return  {status:false, error:`Database Method: ${query.method} Not Implemented For Provider: ${query.provider}`}
            default: return { status: false, error: `Database Method: ${query.method} Not Implemented` }
        }
    }
    else return { status: false, error: `DataBase System is Not Working` }
}