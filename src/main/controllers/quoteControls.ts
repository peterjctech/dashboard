import { ipcMain } from "electron";
import { getId, openDB, addImage, retrieveImage, removeImage } from "../utils";
import { QuoteArgs, QuoteModel } from "../interfaces";

ipcMain.handle("createQuote", async (_, args: QuoteArgs) => {
    if (!args.quote) return { error: "Please fill out the form properly" };

    const quoteId = getId();

    if (args.image) {
        addImage({ path: args.image, id: quoteId });
    }

    const props = {
        quote_id: quoteId,
        quote: "'" + args.quote + "'",
    };

    try {
        const db = await openDB();
        await db.run("INSERT INTO quotes (quote_id, quote) VALUES (?, ?)", [props.quote_id, props.quote]);

        const image = retrieveImage(props.quote_id);

        return { success: `Created quote ${props.quote}`, data: { ...props, image: image || null } };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create quote" };
    }
});

ipcMain.handle("getQuotes", async () => {
    try {
        const db = await openDB();
        const quotes = await db.all("SELECT * FROM quotes");

        const data = quotes.map((obj) => {
            const image = retrieveImage(obj.quote_id);
            return { ...obj, image };
        });

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get quotes" };
    }
});

ipcMain.handle("updateQuote", async (_, args: QuoteModel) => {
    if (args.image) {
        const success = await removeImage(args.quote_id);
        if (success) {
            addImage({ id: args.quote_id, path: args.image });
        } else {
            return { error: "Failed to remove image" };
        }
    }
    try {
        const db = await openDB();
        await db.run("UPDATE quotes SET quote = ? WHERE quote_id = ?", [args.quote, args.quote_id]);

        const image = retrieveImage(args.quote_id);
        const data = {
            quote_id: args.quote_id,
            quote: args.quote,
            image,
        };

        return { info: `Updated quote ${args.quote}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update quote" };
    }
});

ipcMain.handle("deleteQuote", async (_, args: QuoteModel) => {
    const success = removeImage(args.quote_id);
    if (!success) return { error: "Failed to remove image" };

    try {
        const db = await openDB();
        await db.run("DELETE FROM quotes WHERE quote_id = ?", args.quote_id);

        return { info: `Deleted quote ${args.quote}`, data: args.quote_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete quote" };
    }
});
