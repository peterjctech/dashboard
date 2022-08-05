import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createQuoteModel } from "../services";
import { Quote, QuoteProps } from "../types";

ipcMain.handle("createQuote", async (_, props: QuoteProps) => {
    if (!props.quote) return { warning: "You must input a quote" };
    const model = createQuoteModel(props);

    try {
        const db = await openDB();
        await db.run("INSERT INTO quotes (quote_id, quote) VALUES (?, ?)", [model.quote_id, model.quote]);

        return { success: `Created quote ${model.quote}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create quote" };
    }
});

ipcMain.handle("getQuotes", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM quotes");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get quotes" };
    }
});

ipcMain.handle("deleteQuote", async (_, props: Quote) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM quotes WHERE quote_id = ?", props.quote_id);
        return { info: `Deleted quote ${props.quote}`, data: props.quote_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete quote" };
    }
});
