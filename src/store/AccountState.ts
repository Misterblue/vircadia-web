/*
//  AccountState.ts
//
//  Created by Robert Adams, July 31, 2021
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

export class AccountState {
    public isLoggedIn = false;
    public isAdmin = false;
    public username = "";
    public accountRoles: string[] = [];
    public accountId = "";
    // public metaverseServer: Nullable<MetaverseState> = undefined;
    // Token data
    public accessToken: Nullable<string> = undefined;
    public refreshToken: Nullable<string> = undefined;
    public tokenType: Nullable<string> = "";
    public createdAt = 0;
    public expiresIn = 0;
    public scope: string[] = [];
    // Options
    public useAsAdmin = false;
    // Profile
    public images: ImageTypes = {};

}

export class ImageTypes {
    public hero?: Nullable<string> = undefined;
    public tiny?: Nullable<string> = undefined;
    public thumbnail?: Nullable<string> = undefined;
}