import { openDB } from "../utils";
import { QuoteProps, QuoteModel } from "../../interfaces";

export const getQuotes = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM quotes");
    return data;
};

export const createQuote = async (props: QuoteProps) => {
    const db = await openDB();
    await db.run("INSERT INTO quotes (quote_id, quote) VALUES (?, ?)", [props.quote_id, props.quote]);
    return props;
};

export const updateQuote = async (args: QuoteModel) => {
    const db = await openDB();
    await db.run("UPDATE quotes SET quote = ? WHERE quote_id = ?", [args.quote, args.quote_id]);
    return args;
};

export const deleteQuote = async (args: QuoteModel) => {
    const db = await openDB();
    await db.run("DELETE FROM quotes WHERE quote_id = ?", args.quote_id);
    return args.quote_id;
};
