//
//  avatarState.ts
//
//  Created by Nolan Huang on 17 Oct 2022.
//  Copyright 2022 Vircadia contributors.
//  Copyright 2022 DigiSomni LLC.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable new-cap */

import { Vector3 } from "@babylonjs/core";

export enum State {
    Idle,
    Move,
    Jump,
    Teleport,
    Stop
}

export enum JumpSubState {
    None,
    Start,
    Jumping,
    Rising,
    Falling,
    Landing
}

export enum Action {
    Idle,
    WalkForward,
    WalkBackward,
    WalkLeft,
    WalkRight,
    TurnLeft,
    TurnRight,
    Jump,
    Land,
    Sit,
    RunForward
}

export type AnimationName =
    "idle02" | "walk_fwd" | "walk_bwd" | "walk_left" | "walk_right" |
    "turn_left" | "turn_right" | "jumping_temp" | "sitting_crosslegged" |
    "jump_standing_land_settle_all" | "jump_standing_launch_all" | "jump_standing_apex_all" |
    "run_bwd" | "run_fast_fwd" | "run_fast_left" | "run_fast_right";

export class AvatarState {
    public walkSpeed = 4;
    public runSpeed = 10;
    public landSpeed = 4;
    public currentSpeed = 0;

    public rotationSpeed = 40 * Math.PI / 180;

    public moveDir = Vector3.Zero();
    public angularVelocity = 0;
    public duration = 0;

    public isRunning = false;
    public state = State.Stop;
    public action: Action = Action.Idle;

    public jumpSubstate = JumpSubState.None;
    public jumpImpluse = 5;
    public canImpluse = true;
    public landingDuration = 0;
    public jumpInPlace = false;
    public previousPosY = 0;
}