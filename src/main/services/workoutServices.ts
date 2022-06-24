import { WorkoutProps, WorkoutModel } from "../interfaces";
import { openDB } from "../utils";

export const createWorkout = async (props: WorkoutProps) => {
    const db = await openDB();
    await db.run(
        "INSERT INTO workouts (workout_id, workout, value, timestamp, date, activity_id) VALUES (?, ?, ?, ?, ?, ?)",
        [props.workout_id, props.workout, props.value, props.timestamp, props.date, props.activity_id]
    );

    return props;
};

export const getWorkouts = async () => {
    const db = await openDB();
    const workouts = await db.all(
        "SELECT workout_id, workout, value, timestamp, date, activity_id, activity, type, class FROM workouts INNER JOIN activities USING (activity_id)"
    );
    workouts.sort((a, b) => b.timestamp - a.timestamp);
    return workouts;
};

export const deleteWorkout = async (args: WorkoutModel) => {
    const db = await openDB();
    await db.run("DELETE FROM workouts WHERE workout_id = ?", args.workout_id);
    return args.workout_id;
};
