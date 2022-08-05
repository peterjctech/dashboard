import { ref, h } from "vue";
import { NDatePicker } from "naive-ui";
import dayjs from "dayjs";

export default function () {
    const date = ref(dayjs().unix());
    const time = ref({
        hour: 12,
        minute: 30,
    });

    const DatePicker = h(NDatePicker, {
        props: {
            value: date.value,
        },
        defaultValue: dayjs().unix() * 1000,
        onUpdateValue: (val: number) => {
            date.value = val / 1000;
        },
    });

    const parseTimestamp = (time?: { hour: number; minute: number }) => {
        let day = dayjs.unix(date.value);
        if (time) {
            day = day.hour(time.hour).minute(time.minute);
        }
        const timestamp = day.unix();
        return timestamp;
    };

    return { DatePicker, parseTimestamp, time };
}
