
export type UserPermissions = {
    group: string,
    accessLevel: number
}

export type User = {
    accountEmail: string,
    allowedAuthProviders: Array<string>,
    groups: Array<UserPermissions>,
    profileID: number
}

export type Address = {
    buildingNumber?: number,
    street?: string,
    city?: string,
    region?: string,
    country?: string,
    postalCode?: string

}

export type PhoneInfo = {
    phoneNumber?: string
}

export type UserInfo = {
    nameFirst?: string,
    nameLast?: string,
    displayName?: string
    address?: Address,
    primaryPhone?: PhoneInfo
}




export type provider = "MONGOCLIENT" | "POSTGRESCLIENT"
// type provider = "MONGOCLIENT" | "POSTGRESCLIENT" |"OTHERCLIENT"

export type method = "FIND1" | "DELETE1" | "UPDATE1" | "CREATE1" | "FINDX" | 
                        "DELETEX" | "UPDATEX"| "CREATEX" | "GETSTORE"
//type method = "FIND" |"DELETE" |"UPDATE" |"GETSTORE" |"NEWCOMMAND"





export type DatabaseConfig = {
    database: string, // "apiservice"
    provider: provider, // MongoClient, Postgres
    store: string, // MongoStore
    sessionCollection: string, // The collection sesssions are stored in
    userCollection: string // The collection users are stored in
}

export type AuthenticationReturn = {
    [key: string]: (...args: any[]) => any;
};