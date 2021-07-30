/*
//  index.js
//
//  Created by Kalila L. on May 9th, 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import { route } from "quasar/wrappers";
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from "vue-router";
import routes from "./routes";

/*
* If not building with SSR mode, you can
* directly export the Router instantiation;
*
* The function below can be async too; either use
* async/await or return a Promise which resolves
* with the Router instance.
*/

export default route(function (/* { store, ssrContext } */) {
    // Compute which function to use to create history
    // eslint-disable-next-line no-nested-ternary
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : process.env.VUE_ROUTER_MODE === "history" ? createWebHistory : createWebHashHistory;

    const createdHistory = process.env.MODE === "ssr" ? createHistory() : createHistory(process.env.VUE_ROUTER_BASE);

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createdHistory
    });

    return Router;
});
