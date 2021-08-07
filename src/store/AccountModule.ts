/*
//  AccountState.ts
//
//  Created by Robert Adams, July 31, 2021
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import { Module } from "vuex";
import { RootState } from "./index";

/* jsdoc
 * Holds the state of a known account.
 */

export enum AccountMutations {
    SET_ISLOGGEDIN = "SET_ISLOGGEDIN"
}
export enum AccountActions {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

const accountState = {
    isLoggedIn: false,
    isAdmin: false,
    username: "",
    accountRoles: Array<string>(),
    accountId: "",
    metaverseServer: null,
    // Token data
    accessToken: undefined,
    refreshToken: undefined,
    tokenType: "",
    createdAt: 0,
    expiresIn: 0,
    scope: Array<string>(),
    // Options
    useAsAdmin: false,
    // Profile
    images: {
        hero: undefined,
        tiny: undefined,
        thumbnail: undefined
    }
};
export type AccountState = typeof accountState;

export const AccountModule: Module<AccountState, RootState> = {
    state: accountState,
    mutations: {
        [AccountMutations.SET_ISLOGGEDIN](pState: AccountState, pIsLogged: boolean) {
            pState.isLoggedIn = pIsLogged;
        }
    },
    actions: {
        async [AccountActions.LOGIN](pState: RootState, pParams: LoginParameters) {
            pState.account.commit
        }
    }

};