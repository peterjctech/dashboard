import { QuoteProps, QuoteModel } from "../types";
import { getId } from "../utils";

export const createQuoteModel = (props: QuoteProps) => {
    const author = props.author || "Anonymous";

    const model: QuoteModel = {
        quote_id: getId(),
        quote: `"${props.quote}" - ${author}`,
    };

    return model;
};
