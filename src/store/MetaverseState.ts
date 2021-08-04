/*
//  MetaverseState.ts
//
//  Created by Robert Adams, August 2, 2021
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

/* jsdoc
 * Holds the state of the metaverse we're connected to
 */
export class MetaverseState {
    public name = "";
    public nickname = "";
    // "server" needs to at least be pre-filled in order to get all other config information.
    public server = "https://metaverse.vircadia.com/live";
    public iceServer = "";
    public serverVersion = "";

    // Create initial metaverse state and optionally set the initial URL
    constructor(pServer?: string) {
        this.server = pServer ?? "https://metaverse.vircadia.com/live";
    }
}
