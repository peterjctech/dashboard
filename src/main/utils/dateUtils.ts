import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDate = (date: dayjs.Dayjs | number, type: "date" | "shortdate" | "datetime") => {
    let dateObj;

    if (typeof date === "number") {
        dateObj = dayjs.unix(date);
    } else {
        dateObj = dayjs(date);
    }

    switch (type) {
        case "date":
            return dateObj.format("dddd, Do MMMM, YYYY");
        case "shortdate":
            return dateObj.format("Do MMMM, YYYY");
        case "datetime":
            return dateObj.format("HH:mm, Do MMMM, YYYY");
    }
};
