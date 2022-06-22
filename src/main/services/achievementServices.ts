import { AchievementProps } from "../interfaces";
import { openDB } from "../utils";

export const createAchievement = async (props: AchievementProps) => {
    const db = await openDB();
    await db.run(
        "INSERT INTO achievements (achievement_id, achievement, timestamp, date, class) VALUES (?, ?, ?, ?, ?)",
        [props.achievement_id, props.achievement, props.timestamp, props.date, props.class]
    );

    return props;
};
