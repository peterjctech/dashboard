const dayjs = require("dayjs");
const { faker } = require("faker");

const pickRandomDate = (daysOne: number, daysTwo: number) => {
    const firstDate: any = dayjs().add(daysOne, "day");
    const secondDate: any = dayjs().add(daysTwo, "day");
    return dayjs(faker.date.between(firstDate, secondDate));
};
const eventDate = pickRandomDate(-14, 90);

const createEvent = (date: number) => {
    const timestamp = date / 1000;

    console.log(timestamp);

    const props = {
        timestamp: date / 1000,
        year: dayjs(date).year(),
        month: dayjs(date).month() + 1,
        day: dayjs(date).date(),
    };

    console.log(props);
};

createEvent(1656568800000);
