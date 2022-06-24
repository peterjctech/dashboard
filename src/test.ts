const dayjs = require("dayjs");
const { faker } = require("@faker-js/faker");

interface SetReminderArgs {
    hour: number;
    minute: number;
}

const setReminder = (args: SetReminderArgs) => {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    console.log(currentHour);
    console.log(currentMinute);
};

setReminder({ hour: 5, minute: 30 });
