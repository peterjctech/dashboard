import dayjs from "dayjs";

export const selectRandomItem = (arr: any[]) => arr[(arr.length * Math.random()) | 0];

export const getRandomTimestamp = (arg1: number, arg2: number) => {
    const dateOne = dayjs().add(arg1, "day").unix();
    const dateTwo = dayjs().add(arg2, "day").unix();
    return Math.floor(Math.random() * (dateTwo - dateOne + 1) + dateOne);
};
