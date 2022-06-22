import { WorkoutProps } from "../interfaces";
import { openDB } from "../utils";

export const createWorkout = async (props: WorkoutProps) => {
    const db = await openDB();
    await db.run("INSERT INTO workouts (workout_id, workout, timestamp, date, activity_id) VALUES (?, ?, ?, ?, ?)", [
        props.workout_id,
        props.workout,
        props.timestamp,
        props.date,
        props.activity_id,
    ]);

    return props;
};
