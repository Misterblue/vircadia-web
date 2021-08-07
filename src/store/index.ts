/*
//  index.js
//
//  Created by Kalila L. on May 9th, 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from "vue";
import Vuex from "vuex"
import { createStore } from "vuex";

import { StateCondition } from "babylonjs/Actions/condition";
import { store } from "quasar/wrappers";
import packageInfo from "../../package.json";

/*
* If not building with SSR mode, you can
* directly export the Store instantiation;
*
* The function below can be async too; either use
* async/await or return a Promise which resolves
* with the Store instance.
*/

import { AccountModule } from "./AccountModule";
import { MetaverseState } from "./MetaverseState";

export enum StateMutations {
    STATE_MUTATE = "STATE_MUTATE"
}
// Payload passed to STATE_MUTATE
export interface MutatePayload {
    property: string,
    update: boolean,
    with: number | string | KeyedCollection
}

const stateState = {
    globalConsts: {
        APP_NAME: packageInfo.productName,
        APP_VERSION: packageInfo.version,
        SAFETY_BEFORE_SESSION_TIMEOUT: 21600 // If a token has 6 or less hours left on its life, refresh it.
    },
    debugging: {},
    notifications: {},
    renderer: {
        canvases: [
            {
                canvas: null
            }
        ]
    },
    error: {
        title: "",
        code: "",
        full: ""
    },
    location: {
        current: "",
        state: "Not Connected"
    }
};

export type RootState = typeof stateState;

export const rootStore = createStore<RootState>({
        modules: {
            account: AccountModule,
            metaverse: MetaverseState,
            dashboard: DashboardState,
            dialog: DialogState,
            audio: AudioState
        },
        state: stateState,
        mutations: {
            /* @jsdoc
             * Changes the value of state variable.
             * @param state - the state block being updated
             * @param {MutatePlayload} - specification of the property to update. See
             *     MutatePayload for explanation of the fields.
             */
            [StateMutations.STATE_MUTATE](state: RootState, payload: MutatePayload) {
                // Create the target location to store the mutation
                let target = state as unknown as KeyedCollection;
                const segments = payload.property.split(".");
                // If there are multiple property parts, walk down until final one found
                while (segments.length > 1) {
                    const seg = segments.shift();
                    if (typeof seg === "string") {
                        if (!target.hasOwnProperty(seg)) {
                            // Assume that value is a KeyedCollection if it doesn't yet exist
                            target[seg] = {};
                        }
                        target = target[seg] as KeyedCollection;
                    }
                }
                const prop = segments[0] as string;
                // At this point, "target[prop]" addresses the value to be mutated

                if (target && prop) {
                    // 'update' says to set with the fields in payload.with
                    if (payload.update) {
                        if (payload["with"]) {
                            const propertiesToSet = payload["with"] as KeyedCollection;
                            Object.keys(propertiesToSet).forEach((withprop) => {
                                (target[prop] as KeyedCollection)[withprop] = propertiesToSet[prop];
                            });
                        }
                    } else {
                        // if not 'update', just set the value into the state target
                        target[prop] = payload["with"];
                    }
                }

                /* original code
                let base = state;
                const segments = payload.property.split(".");
                while (segments.length > 1) {
                    const segment = segments.shift();
                    if (segment && !(segment in base)) {
                        base[segment] = {};
                    }
                    base = base[segment];
                }
                const prop = segments[0];

                if (!payload.update || !(prop in base)) {
                    base[prop] = payload.with;
                } else {
                    for (const item in payload.with) {
                        if (Object.prototype.hasOwnProperty.call(payload.with, item)) {
                            base[prop][item] = payload.with[item];
                        }
                    }
                }
                */

                // if (state.debugging) {
                //     console.info("Payload:", payload.property, "with:", payload.with, "state is now:", this.state);
                // }
            }
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env["DEBUGGING"] !== "true"
    });

    return Store;
});
