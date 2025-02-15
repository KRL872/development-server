import { MongoClient } from "mongodb"
import { connections, Query, QueryResult } from "./database"

import MongoStore from "connect-mongo"
import dotenv from "dotenv"
dotenv.config();
export const openMongo = async (query: Query): Promise<boolean> => {
    try {
        console.log("URI: ",process.env.MONGO_DBURI)
        console.log(`Opening Database: ${query.database} with Provider: ${query.provider} `)
        const client = new MongoClient(process.env.MONGO_DBURI!)
        await client.connect();
        connections.set(`${query.provider}-${query.database}`, client)
        return true;
    } catch (error) {
        console.log(`Error Opening Database: ${query.database} with Provider: ${query.provider} `)
        return false;
    }
}
export const closeMongo = async (query: Query): Promise<void> => {
    const client = connections.get(`${query.provider}-${query.database}`)
    if (client && (client instanceof MongoClient)) await client.close()
    connections.delete(`${query.provider}-${query.database}`);

}
export const testMongo = async (query: Query): Promise<boolean> => {
    const client = connections.get(`${query.provider}-${query.database}`)
    if (!client || !(client instanceof MongoClient)) return false;
    try {

        await client.db(query.database).collection(query.collection).find(query.filter).limit(1).toArray();
        return true;
    } catch (error) {
        console.log("Error", error)
        return false
    }

}


export const findMongo = async (query: Query): Promise<(QueryResult)> => {
    const client = connections.get(`${query.provider}-${query.database}`)
    if (!client || !(client instanceof MongoClient)) return { status: false, results: ["Error in Find"] };
    try {

        const result = await client.db(query.database).collection(query.collection).find(query.filter).toArray();
        return { status: true, results: result };
    } catch (error) {
        console.log("Error", error)
        return { status: false, results: ["Error in Find"] }
    }
}


export const deleteMongo = async (query: Query): Promise<(QueryResult)> => {
    await Promise.resolve()
    return {} as QueryResult
}

export const updateMongo = async (query: Query): Promise<(QueryResult)> => {
    await Promise.resolve()
    return {} as QueryResult
}
export const getStoreMongo = async (query: Query): Promise<(QueryResult)> => {

    const client = connections.get(`${query.provider}-${query.database}`)
    if (!client || !(client instanceof MongoClient)) return { status: false, error: "Failed To Get MongoStore" };
    const storeOptions = { client, dbName: query.database, collectionName: query.collection };
    const store = MongoStore.create(storeOptions);
    return { status: true, store };
}


