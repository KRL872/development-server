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