import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Event, EventProps, Reminder, ReminderProps } from "@types";
import { useGeneral } from "@store";
import dayjs from "dayjs";

interface TimeStoreState {
    events: Event[];
    reminders: Reminder[];
}

const useTime = defineStore("timeStore", {
    state: (): TimeStoreState => {
        return {
            events: [],
            reminders: [],
        };
    },
    actions: {
        async initStore() {
            const events: Event[] = await invoke("getEvents");
            const reminders: Reminder[] = await invoke("getReminders");

            this.events = events;
            this.reminders = reminders;

            this.sortEvents();
        },
        async createEvent(props: EventProps) {
            const response: Event = await invoke("createEvent", props);
            if (response) {
                this.events.push(response);
                this.handleEvent(response, true);
            }
            this.sortEvents();
        },
        async updateEvent(props: Event) {
            const response: Event = await invoke("updateEvent", props);
            if (response) {
                this.events = this.events.map((obj) => (obj.event_id === response.event_id ? response : obj));
                this.handleEvent(props, true);
                this.sortEvents();
            }
        },
        async deleteEvent(props: Event) {
            const response: string = await invoke("deleteEvent", props);
            if (response) {
                this.events = this.events.filter((obj) => obj.event_id !== response);
                const generalStore = useGeneral();
                generalStore.deleteNotification(response);
            }
        },
        async createReminder(props: ReminderProps) {
            const response: Reminder = await invoke("createReminder", props);
            if (response) {
                this.reminders.push(response);
                this.handleReminder(response, true);
            }
        },
        async deleteReminder(props: Reminder) {
            const response: string = await invoke("deleteReminder", props);
            if (response) {
                this.reminders = this.reminders.filter((obj) => obj.reminder_id !== response);
                const generalStore = useGeneral();
                generalStore.deleteNotification(response);
            }
        },
        sortEvents() {
            this.events = this.events.sort((a, b) => a.timestamp - b.timestamp);
        },
        handleEvent(props: Event, update: boolean) {
            const generalStore = useGeneral();
            let message = "";
            let status = 0;
            const hasNotif = generalStore.checkForNotification(props.event_id);
            if (props.timestamp < dayjs().startOf("day").unix()) {
                message = `Event passed: ${props.event}`;
            } else if (props.timestamp <= dayjs().endOf("day").unix()) {
                status = 1;
                message = `Event at ${props.time}: ${props.event}`;
            }

            if (hasNotif && !message) {
                generalStore.deleteNotification(props.event_id);
            } else if (!hasNotif && message) {
                generalStore.addNotification({
                    id: props.event_id,
                    color: "magenta",
                    redirect: "/time",
                    timestamp: dayjs
                        .unix(props.timestamp)
                        .subtract(generalStore.settings.event_warning_time, "hour")
                        .unix(),
                    toDo: message,
                    notif: status ? message : null,
                    update,
                });
            }
        },
        handleReminder(props: Reminder, update: boolean) {
            const generalStore = useGeneral();
            generalStore.addNotification({
                id: props.reminder_id,
                color: "orange",
                redirect: "/time",
                timestamp: props.timestamp,
                toDo: null,
                notif: `Reminder: ${props.reminder}`,
                update,
            });
        },
    },
});

export default useTime;
