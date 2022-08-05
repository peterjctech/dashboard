import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Quote, QuoteProps } from "@types";

interface MiscStoreState {
    quotes: Quote[];
}

const useMisc = defineStore("miscStore", {
    state: (): MiscStoreState => {
        return {
            quotes: [],
        };
    },
    actions: {
        async initStore() {
            const quotes: Quote[] = await invoke("getQuotes");

            this.quotes = quotes;
        },
        async createQuote(props: QuoteProps) {
            const response: Quote = await invoke("createQuote", props);
            if (response) this.quotes.push(response);
        },
        async deleteQuote(props: Quote) {
            const response: string = await invoke("deleteQuote", props);
            this.quotes = this.quotes.filter((obj) => obj.quote_id !== response);
        },
    },
});

export default useMisc;
