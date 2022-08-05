import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Event, EventProps } from "@types";
import { useGeneral } from "@store";
import dayjs from "dayjs";

interface TimeStoreState {
    events: Event[];
}

const useTime = defineStore("timeStore", {
    state: (): TimeStoreState => {
        return {
            events: [],
        };
    },
    actions: {
        async initStore() {
            const events: Event[] = await invoke("getEvents");

            this.events = events;

            this.sortEvents();
        },
        async createEvent(props: EventProps) {
            const response: Event = await invoke("createEvent", props);
            if (response) {
                this.events.push(response);
                this.handleEvent(response);
            }
            this.sortEvents();
        },
        async updateEvent(props: Event) {
            const response: Event = await invoke("updateEvent", props);
            if (response) {
                this.events = this.events.map((obj) => (obj.event_id === response.event_id ? response : obj));
                this.handleEvent(props);
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
        sortEvents() {
            this.events = this.events.sort((a, b) => a.timestamp - b.timestamp);
        },
        handleEvent(props: Event) {
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
                    type: "Event",
                    color: "magenta",
                    redirect: "/time",
                    timestamp: props.timestamp - 3600,
                    toDo: message,
                    notif: status ? message : null,
                });
            }
        },
    },
});

export default useTime;
