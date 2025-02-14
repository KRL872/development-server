

export type UserPermissions = {
    group: string,
    accessLevel: number
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
    businessPhone?: PhoneInfo
    emergencyPhone?: PhoneInfo
}
export type User = {
    accountEmail: string,
    allowedAuthProviders: Array<string>,
    groups: Array<UserPermissions>,
    info?: UserInfo
}




export type provider = "MONGOCLIENT" | "POSTGRESCLIENT"
// type provider = "MONGOCLIENT" | "POSTGRESCLIENT" |"OTHERCLIENT"

export type method = "FIND" | "DELETE" | "UPDATE" | "GETSTORE"
//type method = "FIND" |"DELETE" |"UPDATE" |"GETSTORE" |"NEWCOMMAND"





export type AuthenticationConfig = {
    database: string, // "apiservice"
    provider: provider, // MongoClient, Postgres
    store: string, // MongoStore
    sessionCollection: string, // The collection sesssions are stored in
    userCollection: string // The collection users are stored in
}

export type AuthenticationReturn = {
    [key: string]: (...args: any[]) => any;
};