// Recommended at https://forum.quasar-framework.org/topic/7887/best-way-for-implement-vuex-with-typescript
// "Vuex doesn’t provide typings for this.$store property out of the box.
//  When used with TypeScript, you must declare your own module augmentation."

// vuex.d.ts
import { Store } from "vuex";

declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        count: number,
        account: string
    }

    // provide typings for this.$store
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
