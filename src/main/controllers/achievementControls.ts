import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createAchievementModel } from "../services";
import { Achievement, AchievementProps } from "../types";

ipcMain.handle("createAchievement", async (_, props: AchievementProps) => {
    if (!props.achievement || !props.category_id) return { warning: "You must input a type and achievement" };
    const model = createAchievementModel(props);

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO achievements (achievement_id, achievement, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?)",
            [model.achievement_id, model.achievement, model.timestamp, model.date, model.category_id]
        );
        const data = await db.get(
            "SELECT achievement_id, achievement, timestamp, date, category_id, category, color FROM achievements INNER JOIN categories USING (category_id) WHERE achievement_id = ?",
            model.achievement_id
        );
        return { success: `Created achievement ${data.achievement}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create achievement" };
    }
});

ipcMain.handle("getAchievements", async () => {
    try {
        const db = await openDB();
        const data = await db.all(
            "SELECT achievement_id, achievement, timestamp, date, category_id, category, color FROM achievements INNER JOIN categories USING (category_id)"
        );
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get achievements" };
    }
});

ipcMain.handle("deleteAchievement", async (_, props: Achievement) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM achievements WHERE achievement_id = ?", props.achievement_id);
        return { info: `Deleted achievement ${props.achievement}`, data: props.achievement_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete achievement" };
    }
});
