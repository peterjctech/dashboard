import { GoalProps, GoalModel, Goal } from "../types";
import { getId, formatDate } from "../utils";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

export const parseGoalData = (goals: GoalModel[]) => {
    const now = dayjs().unix();
    const endOfToday = dayjs().endOf("day").unix();
    const inOneWeek = dayjs().add(7, "day").unix();

    const data: Goal[] = [];

    for (let i = 0; i < goals.length; i++) {
        let status = "";
        let color = goals[i].color;

        if (now > goals[i].timestamp) {
            status = "Passed";
            color += " error";
        } else if (endOfToday >= goals[i].timestamp) {
            status = "Today";
            color += " warning";
        } else if (inOneWeek > goals[i].timestamp) {
            const eventDate = dayjs.unix(goals[i].timestamp);
            status = `This ${eventDate.format("dddd")}`;
            color += " success";
        }

        data.push({ ...goals[i], color, status });
    }

    return data;
};

export const createGoalModel = (props: GoalProps) => {
    let length = "";
    let color;
    let date;

    if (typeof props.deadline === "number") {
        color = "white";
        date = dayjs().add(props.deadline, "day").endOf("day");
    } else {
        length = props.deadline;

        let week = dayjs().day() === 0 ? dayjs().endOf("day") : dayjs().endOf("week").add(1, "day");
        let month = dayjs().endOf("month");
        let quarter = dayjs().endOf("quarter");
        let year = dayjs().endOf("year");

        week > month && (week = month);

        switch (props.deadline) {
            case "Weekly":
                date = week;
                color = "red";
                break;
            case "Monthly":
                date = month;
                color = "cyan";
                break;
            case "Quarterly":
                date = quarter;
                color = "magenta";
                break;
            case "Yearly":
                date = year;
                color = "pink";
                break;
        }
    }

    const model: GoalModel = {
        goal_id: getId(),
        goal: props.goal,
        length,
        timestamp: date.unix(),
        date: formatDate(date, "shortdate"),
        color,
    };

    return model;
};
