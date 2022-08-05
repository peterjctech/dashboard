import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Goal, GoalProps, Achievement, AchievementProps, Category, CategoryProps } from "@types";
import { useGeneral } from "@store";
import dayjs from "dayjs";

interface TrophyStoreState {
    achievementTypes: Category[];
    achievements: Achievement[];
    goals: Goal[];
    personalRecords: Achievement[];
}

const useTrophy = defineStore("trophyStore", {
    state: (): TrophyStoreState => {
        return {
            achievementTypes: [],
            achievements: [],
            goals: [],
            personalRecords: [],
        };
    },
    actions: {
        async initStore() {
            const goals: Goal[] = await invoke("getGoals");
            const achievements: Achievement[] = await invoke("getAchievements");
            const achievementTypes: Category[] = await invoke("getCategories", { for: "Achievements" });

            this.goals = goals;
            this.achievements = achievements;
            this.achievementTypes = achievementTypes;

            this.sortGoals();
            this.sortAchievements();
            this.getPersonalRecords();
        },
        async createAchievementType(props: CategoryProps) {
            const response: Category = await invoke("createCategory", props);
            if (response) this.achievementTypes.push(response);
        },
        async updateAchievementType(props: Category) {
            const response: Category = await invoke("updateCategory", props);
            this.achievementTypes = this.achievementTypes.map((obj) => {
                return obj.category_id === response.category_id ? response : obj;
            });
        },
        async deleteAchievementType(props: Category) {
            const response: string = await invoke("deleteCategory", props);
            this.achievementTypes = this.achievementTypes.filter((obj) => obj.category_id !== response);
        },
        async createAchievement(props: AchievementProps) {
            const response: Achievement = await invoke("createAchievement", props);
            if (response) {
                this.achievements.push(response);
                this.sortAchievements();
                this.updatePersonalRecord(response);
            }
        },
        async deleteAchievement(props: Achievement) {
            const response: string = await invoke("deleteAchievement", props);
            this.achievements = this.achievements.filter((obj) => obj.achievement_id !== response);
            this.personalRecords = this.personalRecords.filter((obj) => obj.achievement_id !== response);
        },
        async createGoal(props: GoalProps) {
            const response: Goal = await invoke("createGoal", props);
            if (response) {
                this.goals.push(response);
                this.handleGoal(response, true);
            }
            this.sortGoals();
        },
        async deleteGoal(props: Goal) {
            const response: string = await invoke("deleteGoal", props);
            if (response) {
                this.goals = this.goals.filter((obj) => obj.goal_id !== response);
                const generalStore = useGeneral();
                generalStore.deleteNotification(response);
            }
        },
        sortGoals() {
            this.goals = this.goals.sort((a, b) => a.timestamp - b.timestamp);
        },
        sortAchievements() {
            this.achievements = this.achievements.sort((a, b) => b.timestamp - a.timestamp);
        },
        getPersonalRecords() {
            for (let i = 0; i < this.achievementTypes.length; i++) {
                const achievements = this.achievements.filter(
                    (obj) => obj.category_id === this.achievementTypes[i].category_id
                );
                if (achievements.length > 0) {
                    this.personalRecords.push(achievements.sort((a, b) => b.timestamp - a.timestamp)[0]);
                }
            }
        },
        updatePersonalRecord(props: Achievement) {
            const record = this.personalRecords.find((obj) => obj.category_id === props.category_id);
            if (!record) {
                this.personalRecords.push(props);
            } else if (record.timestamp < props.timestamp) {
                this.personalRecords = this.personalRecords.map((obj) => {
                    return obj.category_id === props.category_id ? props : obj;
                });
            }
        },
        handleGoal(props: Goal, update: boolean) {
            const generalStore = useGeneral();
            let message = "";
            const hasNotif = generalStore.checkForNotification(props.goal_id);
            if (props.status === "Passed") message = `Passed goal: ${props.goal}`;
            if (props.status === "Today") message = `Goal due today: ${props.goal}`;

            if (hasNotif && !message) {
                generalStore.deleteNotification(props.goal_id);
            } else if (!hasNotif && message) {
                generalStore.addNotification({
                    id: props.goal_id,
                    color: "blue",
                    redirect: "/trophy",
                    timestamp: dayjs().startOf("day").hour(generalStore.settings.goal_notify_time).unix(),
                    toDo: `Finish goal: ${props.goal}`,
                    notif: message,
                    update,
                });
            }
        },
    },
});

export default useTrophy;
