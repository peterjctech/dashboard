const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const formatDate = (date) => {
    return date.format("dddd, Do MMMM, YYYY @ HH:mm");
};

const now = dayjs();

const endOfDay = now.endOf("day").unix();
const weekFromNow = now.add(7, "day").unix();

console.log(endOfDay);
console.log(weekFromNow);
