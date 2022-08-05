import { AchievementProps, AchievementModel } from "../types";
import { getId, formatDate } from "../utils";

export const createAchievementModel = (props: AchievementProps) => {
    const model: AchievementModel = {
        achievement_id: getId(),
        achievement: props.achievement,
        timestamp: props.timestamp,
        date: formatDate(props.timestamp, "shortdate"),
        category_id: props.category_id,
    };

    return model;
};
