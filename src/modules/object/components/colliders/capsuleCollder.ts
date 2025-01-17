//
//  capsuleCollider.ts
//
//  Created by Nolan Huang on 4 Oct 2022.
//  Copyright 2022 Vircadia contributors.
//  Copyright 2022 DigiSomni LLC.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

import { ColliderComponent } from "./collider";

import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Scene, Vector3, MeshBuilder, Color4, Color3, PhysicsImpostor
} from "@babylonjs/core";

/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */

export class CapsuleColliderComponent extends ColliderComponent {
    /**
    * Gets a string identifying the type of this Component
    * @returns "Mesh" string
    */
    public get componentType():string {
        return CapsuleColliderComponent.typeName;
    }

    static get typeName(): string {
        return "CapsuleCollider";
    }

    public createCollider(radius?: number, height?: number, position?: Vector3) : void {
        const capsule = MeshBuilder.CreateCapsule("CapsuleCollider",
            { radius, height }, this._scene);

        if (position) {
            capsule.position = position;
        }

        capsule.material = this._getMaterial();

        capsule.isVisible = false;
        // capsule.isPickable = false;
        capsule.checkCollisions = false;

        this._compoundBody = true;
        this.collider = capsule;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
    protected _createColliderImposter() : void {
        if (this.collider) {
            // create CapsuleImpostor with zero mass
            this.collider.physicsImpostor = new PhysicsImpostor(this.collider,
                PhysicsImpostor.CapsuleImpostor,
                { mass: 0 }, this._scene);
        }
    }
}
