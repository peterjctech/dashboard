import { ipcMain } from "electron";
import { WorkoutModel, WorkoutArgs } from "../interfaces";
import { getId, formatShortDate } from "../utils";
import { getWorkouts, createWorkout, deleteWorkout } from "../services";
import dayjs from "dayjs";

ipcMain.handle("createWorkout", async (_, args: WorkoutArgs) => {
    if (!args.value || !args.activity_id) return { error: "Please fill out the form properly" };

    let workout;
    let value = null;

    if (args.type === "Duration" || args.type === "Timed") {
        if (args.value[0] === 0) {
            workout = `${args.value[1]}:${args.value[2]}}`;
        } else {
            workout = `${args.value[0]}:${args.value[1]}:${args.value[2]}}`;
        }

        value = args.value[0] * 3600 + args.value[1] * 60 + args.value[2];
    } else if (args.type === "Count") {
        value = args.value;
        workout = args.value;
    } else {
        workout = args.value;
    }

    const props = {
        workout_id: getId(),
        value,
        workout,
        date: dayjs().format("ddd-D-MMM-YYYY"),
        timestamp: dayjs().unix(),
        activity_id: args.activity_id,
    };

    try {
        const data = await createWorkout(props);
        return { success: "Created workout", data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create workout" };
    }
});

ipcMain.handle("getWorkouts", async () => {
    try {
        const data = await getWorkouts();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get workouts" };
    }
});

ipcMain.handle("deleteWorkout", async (_, args: WorkoutModel) => {
    try {
        const data = await deleteWorkout(args);
        return { info: "Deleted workout", data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete workout" };
    }
});
