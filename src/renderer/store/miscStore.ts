import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Quote, QuoteProps, Shortcut, ShortcutProps } from "@types";

interface MiscStoreState {
    quotes: Quote[];
    shortcuts: Shortcut[];
}

const useMisc = defineStore("miscStore", {
    state: (): MiscStoreState => {
        return {
            quotes: [],
            shortcuts: [],
        };
    },
    actions: {
        async initStore() {
            const quotes: Quote[] = await invoke("getQuotes");
            const shortcuts: Shortcut[] = await invoke("getShortcuts");

            this.quotes = quotes;
            this.shortcuts = shortcuts;
        },
        async createQuote(props: QuoteProps) {
            const response: Quote = await invoke("createQuote", props);
            if (response) this.quotes.push(response);
        },
        async deleteQuote(props: Quote) {
            const response: string = await invoke("deleteQuote", props);
            this.quotes = this.quotes.filter((obj) => obj.quote_id !== response);
        },
        async createShortcut(props: ShortcutProps) {
            const response: Shortcut = await invoke("createShortcut", props);
            if (response) this.shortcuts.push(response);
        },
        async updateShortcut(props: Shortcut) {
            const response: Shortcut = await invoke("updateShortcut", props);
            this.shortcuts = this.shortcuts.map((obj) => {
                return obj.shortcut_id === response.shortcut_id ? response : obj;
            });
        },
        async deleteShortcut(props: Shortcut) {
            const response: string = await invoke("deleteShortcut", props);
            this.shortcuts = this.shortcuts.filter((obj) => obj.shortcut_id !== response);
        },
    },
});

export default useMisc;
