import { Client as PgClient } from "pg"
import { connections, Query, QueryResult } from "./database"

export const openPostgres = async (query: Query): Promise<boolean> => {

    try {
        console.log(`Opening Database: ${query.database} with Provider: ${query.provider} `)
        const client = new PgClient({
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "MooMoo2"
        })
        await client.connect();
        connections.set(`${query.provider}-${query.database}`, client)
        return true;
    } catch (error) {
        console.log(`Error Opening Database: ${query.database} with Provider: ${query.provider} `)
        return false;
    }
}

export const closePostgres = async (query: Query): Promise<void> => {
    const client = connections.get(`${query.provider}-${query.database}`)
    if (client && (client instanceof PgClient)) await client.end()
    connections.delete(`${query.provider}-${query.database}`);
}

export const testPostgres = async (query: Query): Promise<boolean> => {


    const client = connections.get(`${query.provider}-${query.database}`)
    if (!client || !(client instanceof PgClient)) return false;

    try {
        await client.query("SELECT 1")
        return true;
    } catch (error) {
        console.log("Error", error)
        return false
    }

}

export const findPostgres = async (query: Query): Promise<QueryResult> => {
    return { status: true, results: [{ email: "you@me.org" }] };
}
export const deletePostgres = async (query: Query): Promise<(QueryResult)> => {
    await Promise.resolve()
    return {} as QueryResult
}

export const updatePostgres = async (query: Query): Promise<(QueryResult)> => {
    await Promise.resolve()
    return {} as QueryResult
}
export const getStorePostgres = async (query: Query): Promise<(QueryResult)> => {
    await Promise.resolve()
    return {} as QueryResult
}



