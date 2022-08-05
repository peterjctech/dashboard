import { defineStore } from "pinia";
import { Settings, Notification, ToDo } from "@types";
import { invoke, toast, notify } from "@helpers";
import { useTickets, useMisc } from "@store";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

interface AddNotificationProps {
    id: string;
    type: string;
    color: string;
    redirect: string;
    timestamp: number;
    toDo: string | null;
    notif: string | null;
}

interface Clock {
    date: string;
    time: string;
    timeLeft: string;
}

interface NextNotification {
    ids: string[];
    message: string;
    timestamp: number;
}

interface GeneralStoreState {
    settings: Settings;
    clock: Clock;
    toDoList: ToDo[];
    notifications: Notification[];
    nextNotification: null | NextNotification;
}

const useGeneral = defineStore("generalStore", {
    state: (): GeneralStoreState => {
        return {
            settings: {
                database_version: 0,
                app_version: "",
                ticket_notify_time: 0,
            },
            clock: {
                date: "",
                time: "",
                timeLeft: "",
            },
            toDoList: [],
            notifications: [],
            nextNotification: null,
        };
    },
    actions: {
        async initApp() {
            await this.refreshStore();

            const startOfDay = dayjs().startOf("day").unix();
            const startOfTomorrow = dayjs().startOf("day").add(1, "day").unix();
            this.updateTime(startOfDay, startOfTomorrow);

            const interval = setInterval(() => {
                this.updateTime(startOfDay, startOfTomorrow);
                if (this.nextNotification && this.nextNotification.timestamp <= dayjs().unix()) {
                    toast.help(this.nextNotification.message);
                    notify.notif();
                    this.notifications = this.notifications.map((obj) => {
                        if (this.nextNotification?.ids.includes(obj.id)) {
                            return { ...obj, is_notified: true };
                        } else {
                            return obj;
                        }
                    });

                    this.setNextNotification();
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
                toast.help("Refreshing store...");
                this.initApp();
            }, (dayjs().startOf("day").add(1, "day").unix() - dayjs().unix()) * 1000);
        },
        async updateSettings(props: Settings) {
            await invoke("updateSettings", props);
            this.refreshStore();
        },
        async refreshStore() {
            this.toDoList = [];
            this.notifications = [];
            this.nextNotification = null;
            this.settings = await invoke("getSettings");
            this.clock.date = dayjs().format("dddd, Do MMMM, YYYY");

            const ticketStore = useTickets();
            const miscStore = useMisc();

            await ticketStore.initStore();
            await miscStore.initStore();

            ticketStore.tickets.forEach((obj) => ticketStore.handleTicket(obj));

            this.setNextNotification();
        },
        updateTime(startOfDay: number, startOfTomorrow: number) {
            this.clock.time = dayjs().format("HH:mm:ss");
            const timer = startOfTomorrow - dayjs().unix() + startOfDay;
            this.clock.timeLeft = dayjs.unix(timer).format("HH:mm:ss");
        },
        // Manage Notifications
        setNextNotification() {
            const futureNotifs = this.notifications
                .filter((obj) => !obj.is_notified)
                .sort((a, b) => a.timestamp - b.timestamp);

            if (futureNotifs.length === 0) {
                this.nextNotification = null;
            } else {
                const notifs = this.notifications.filter((obj) => obj.timestamp === futureNotifs[0].timestamp);

                if (notifs.length > 0) {
                    this.nextNotification = {
                        ids: notifs.map((obj) => obj.id),
                        message: notifs.length > 0 ? "You have new notifications..." : notifs[0].message,
                        timestamp: futureNotifs[0].timestamp,
                    };
                }
            }
        },
        toggleNotification(id: string) {
            this.notifications = this.notifications.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, is_read: !obj.is_read };
                } else {
                    return obj;
                }
            });
        },
        readAllNotifications() {
            this.notifications = this.notifications.map((obj) => {
                return { ...obj, is_read: true };
            });
        },
        addNotification(props: AddNotificationProps) {
            if (props.notif) {
                this.notifications.push({
                    id: props.id,
                    type: props.type,
                    message: props.notif,
                    time: dayjs.unix(props.timestamp).format("HH:mm"),
                    timestamp: props.timestamp,
                    is_notified: false,
                    is_read: false,
                });

                if (!this.nextNotification || this.nextNotification.timestamp > props.timestamp) {
                    this.setNextNotification();
                }
            }
            if (props.toDo) {
                this.toDoList.push({
                    id: props.id,
                    message: props.toDo,
                    redirect: props.redirect,
                    color: props.color,
                });
            }
        },
        checkForNotification(id: string) {
            if (this.toDoList.some((obj) => obj.id === id) || this.notifications.some((obj) => obj.id === id))
                return true;
            return false;
        },
        deleteNotification(id: string) {
            this.notifications = this.notifications.filter((obj) => obj.id !== id);
            this.toDoList = this.toDoList.filter((obj) => obj.id !== id);
        },
    },
});

export default useGeneral;
