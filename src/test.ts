const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const formatDate = (date) => {
    return date.format("dddd, D MMMM, YYYY");
};

console.log(dayjs().format("D-MMM-YYYY"));
