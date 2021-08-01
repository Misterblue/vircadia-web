/*
//  index.js
//
//  Created by Kalila L. on May 9th, 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import { StateCondition } from "babylonjs/Actions/condition";
import { store } from "quasar/wrappers";
import { createStore } from "vuex";

/*
* If not building with SSR mode, you can
* directly export the Store instantiation;
*
* The function below can be async too; either use
* async/await or return a Promise which resolves
* with the Store instance.
*/

import { State } from "./State";
import { MutatePayload } from "./MutatePayload";

export default store((/* { ssrContext } */) => {
    const Store = createStore({
        modules: {
            // example
        },
        state: new State(),
        mutations: {
            /* @jsdoc
             * Changes the value of state variable.
             * @param state - the state block being updated
             * @param {MutatePlayload} - specification of the property to update. See
             *     MutatePayload for explanation of the fields.
             */
            mutate(state: State, payload: MutatePayload) {
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
        }

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        // TS error says 'strict' is not a member of this structure
        // strict: process.env["DEBUGGING"]
    });

    return Store;
});
