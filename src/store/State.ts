import packageInfo from "../../package.json";

import { AccountState } from "./AccountState";
import { MetaverseState } from "./MetaverseState";

// NOTE NOTE NOTE
// This is a temporary definition with a bunch of KeyedCollection filler to get things to compile.
// Definitions are necessary for the the individual section definitions.
// TODO: Fix the global state definition

export class DashboardConfig {
    public dashboardTheme = 2;
}

export class State {
    public globalConsts: KeyedCollection = {
        APP_NAME: packageInfo.productName,
        APP_VERSION: packageInfo.version,
        SAFETY_BEFORE_SESSION_TIMEOUT: 21600 // If a token has 6 or less hours left on its life, refresh it.
    };

    public metaverseConfig: MetaverseState = new MetaverseState();

    public account: AccountState = new AccountState();

    public profile: KeyedCollection = {
        displayName: ""
    };

    public dialog: KeyedCollection = {
        show: false,
        which: "",
        notice: {
            title: "",
            message: ""
        }
    };

    public error: KeyedCollection = {
        title: "",
        code: "",
        full: ""
    };

    public dashboardConfig: DashboardConfig = new DashboardConfig();

    public debugging: KeyedCollection = {};
    public notifications: KeyedCollection = {};
    public renderer: KeyedCollection = {
        canvases: [
            {
                canvas: null
            }
        ]
    };

    public location: KeyedCollection = {
        current: "",
        state: "Not Connected"
    };

    // Mounted Classes - mounted from App.vue
    public Audio: KeyedCollection = {
        input: null
    };

    public Metaverse: AnyValue = undefined;

    public Entities: AnyValue = undefined;

}
