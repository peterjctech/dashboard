import { ipcMain } from "electron";
import { getId } from "../utils";
import { QuoteArgs, QuoteModel } from "../../interfaces";
import { createQuote, getQuotes, updateQuote, deleteQuote } from "../services";

ipcMain.handle("createQuote", async (_, args: QuoteArgs) => {
    if (!args.quote) return { error: "Please fill out the form properly" };

    const props = {
        quote_id: getId(),
        quote: '"' + args.quote + '"',
    };

    try {
        const data = await createQuote(props);
        return { success: `Created quote ${props.quote}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create quote" };
    }
});

ipcMain.handle("getQuotes", async () => {
    try {
        const data = await getQuotes();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get quotes" };
    }
});

ipcMain.handle("updateQuote", async (_, args: QuoteModel) => {
    try {
        const data = await updateQuote(args);
        return { info: `Updated quote ${args.quote}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update quote" };
    }
});

ipcMain.handle("deleteQuote", async (_, args: QuoteModel) => {
    try {
        const data = await deleteQuote(args);
        return { info: `Deleted quote ${args.quote}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete quote" };
    }
});
