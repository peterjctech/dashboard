import { defineStore } from "pinia";
import { Settings } from "@types";
import { invoke } from "@helpers";
import { useTickets } from "@store";

interface GeneralStoreState {
    settings: Settings;
}

const useGeneral = defineStore("generalStore", {
    state: (): GeneralStoreState => {
        return {
            settings: {
                database_version: 0,
                app_version: "",
            },
        };
    },
    actions: {
        async initApp() {
            const ticketStore = useTickets();

            await this.initStore();
            await ticketStore.initStore();
        },
        async initStore() {
            const settings: Settings = await invoke("getSettings");

            this.settings = settings;
        },
    },
});

export default useGeneral;
