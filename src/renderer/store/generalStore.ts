import { defineStore } from "pinia";
import { Settings, Notification, ToDo } from "@types";
import { invoke, toast, notify } from "@helpers";
import { useTickets, useMisc, useTrophy, useTime, useNotebook } from "@store";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

interface AddNotificationProps {
    id: string;
    color: string;
    redirect: string;
    timestamp: number;
    toDo: string | null;
    notif: string | null;
    update: boolean;
}

interface GeneralStoreState {
    settings: Settings;
    clock: {
        date: string;
        time: string;
        timeLeft: string;
    };
    toDoList: ToDo[];
    notifications: Notification[];
    nextNotification: null | {
        ids: string[];
        message: string;
        timestamp: number;
    };
    weather: {
        cityName: string;
        temperature: number;
        sunrise: string;
        sunset: string;
        description: string;
        icon: string;
        last_updated: string;
    };
}

const useGeneral = defineStore("generalStore", {
    state: (): GeneralStoreState => {
        return {
            settings: {
                database_version: 0,
                app_version: "",
                ticket_notify_time: 0,
                goal_notify_time: 0,
                event_warning_time: 0,
                habit_notify_time: 0,
                zip_code: 0,
                latitude: 0,
                longitude: 0,
            },
            clock: {
                date: "",
                time: "",
                timeLeft: "",
            },
            toDoList: [],
            notifications: [],
            nextNotification: null,
            weather: {
                cityName: "",
                temperature: 0,
                sunrise: "",
                sunset: "",
                description: "",
                icon: "",
                last_updated: "",
            },
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
            await this.getWeather();

            const ticketStore = useTickets();
            const miscStore = useMisc();
            const trophyStore = useTrophy();
            const timeStore = useTime();
            const notebookStore = useNotebook();

            await ticketStore.initStore();
            await miscStore.initStore();
            await trophyStore.initStore();
            await timeStore.initStore();
            await notebookStore.initStore();

            ticketStore.tickets.forEach((obj) => ticketStore.handleTicket(obj, false));
            trophyStore.goals.forEach((obj) => trophyStore.handleGoal(obj, false));
            timeStore.events.forEach((obj) => timeStore.handleEvent(obj, false));
            notebookStore.habits.forEach((obj) => notebookStore.handleHabit(obj, false));
            timeStore.reminders.forEach((obj) => timeStore.handleReminder(obj, false));

            this.setNextNotification();
        },
        updateTime(startOfDay: number, startOfTomorrow: number) {
            this.clock.time = dayjs().format("HH:mm:ss");
            const timer = startOfTomorrow - dayjs().unix() + startOfDay;
            this.clock.timeLeft = dayjs.unix(timer).format("HH:mm:ss");
        },
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
        addNotification(props: AddNotificationProps) {
            if (props.notif) {
                this.notifications.push({
                    id: props.id,
                    message: props.notif,
                    time: dayjs.unix(props.timestamp).format("HH:mm"),
                    timestamp: props.timestamp,
                    is_notified: false,
                    is_read: false,
                });

                if (props.update && this.nextNotification && this.nextNotification.timestamp >= props.timestamp) {
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
        async getWeather() {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${this.settings.latitude}&lon=${
                    this.settings.longitude
                }&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            const json = await response.json();

            if (json.name) {
                this.weather = {
                    cityName: json.name,
                    temperature: Math.round(json.main.temp),
                    sunrise: dayjs.unix(json.sys.sunrise).format("HH:mm"),
                    sunset: dayjs.unix(json.sys.sunset).format("HH:mm"),
                    description: json.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
                    last_updated: dayjs().format("HH:mm"),
                };
            } else {
                toast.error("Failed to fetch weather data. Please configure your setting properly.");
            }
        },
        async fetchCoordinates(zipCode: number) {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            const json = await response.json();
            if (!json.lat) {
                toast.error("Bad zip code");
                return null;
            }
            return {
                latitude: json.lat,
                longitude: json.lon,
            };
        },
    },
});

export default useGeneral;
