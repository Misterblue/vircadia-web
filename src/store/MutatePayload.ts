/*
//  MutatePayload.ts
//
//  Created by Robert Adams, July 31, 2021
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

export type MutatePayload = {
    // The name of the state property to update.
    // This can contain dots that will address depth variables: "account.images.thumbnail"
    property: string;
    // TRUE if 'with' contains a KeyedCollection of properties to update
    update: boolean;
    // Either the value to set in the named property or a collection of properties
    //    to set in the property.
    with: KeyedCollection | unknown
};
