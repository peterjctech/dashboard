import { ShoppingProps, ShoppingModel } from "../types";
import { getId, colors, selectRandomItem } from "../utils";

export const createShoppingModel = (props: ShoppingProps) => {
    const model: ShoppingModel = {
        item_id: getId(),
        item: props.item,
        color: selectRandomItem(colors),
    };

    return model;
};
