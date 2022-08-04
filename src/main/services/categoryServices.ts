import { CategoryProps, CategoryModel } from "../types";
import { getId } from "../utils";

export const createCategoryModel = (props: CategoryProps) => {
    const model: CategoryModel = {
        category_id: getId(),
        category: props.category,
        color: props.color,
        for: props.for,
    };

    return model;
};
