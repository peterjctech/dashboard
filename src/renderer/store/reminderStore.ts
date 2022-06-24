import { defineStore } from "pinia";
import { invoke, notify, toast } from "@helpers";
import { ReminderModel } from "../interfaces/models";
import dayjs from "dayjs";

interface CreateReminderArgs {
    reminder: string;
    isRelative: boolean;
    hour: number;
    minute: number;
}

interface ReminderStoreArgs {
    reminders: ReminderModel[];
}

export const useReminders = defineStore("reminderStore", {
    state: (): ReminderStoreArgs => {
        return {
            reminders: [],
        };
    },
    actions: {
        async getReminders() {
            const response: ReminderModel[] = await invoke("getReminders");
            this.reminders = response;
            this.reminders.sort((a, b) => a.timestamp - b.timestamp);
            this.setNextReminder();
        },
        async createReminder(args: CreateReminderArgs) {
            const sendArgs = {
                reminder: args.reminder,
                hour: args.hour,
                minute: args.minute,
                type: args.isRelative ? "Relative" : "Absolute",
            };
            const response: ReminderModel = await invoke("createReminder", sendArgs);
            this.reminders.push(response);
            this.reminders.sort((a, b) => a.timestamp - b.timestamp);
            this.setNextReminder();
        },
        async setNextReminder() {
            const time = this.reminders[0].timestamp - dayjs().unix();
            if (time <= 0) {
                notify.notif();
                toast.success(this.reminders[0].reminder);
                const response = await invoke("deleteReminder", this.reminders[0]);
                this.reminders = this.reminders.filter((obj: ReminderModel) => obj.reminder_id !== response);
                this.setNextReminder();
            } else {
                setTimeout(async () => {
                    notify.notif();
                    toast.success(this.reminders[0].reminder);
                    await invoke("deleteReminder", this.reminders[0]);
                    const response = await invoke("deleteReminder", this.reminders[0]);
                    this.reminders = this.reminders.filter((obj: ReminderModel) => obj.reminder_id !== response);
                    this.setNextReminder();
                }, time * 1000);
            }
        },
    },
    getters: {
        formattedTimeLeft: (state) => {
            if (state.reminders[0]) {
                let timestamp = state.reminders[0].timestamp;
                const now = dayjs().unix();
                let timeLeft = timestamp - now;
                const hours = timeLeft > 3600 ? Math.floor(timeLeft / 3600) : 0;
                timeLeft -= hours * 3600;
                const minutes = timeLeft > 60 ? Math.floor(timeLeft / 60) : 0;
                console.log(minutes);
                timeLeft -= minutes * 60;
                const seconds = timeLeft;
                return `"${state.reminders[0].reminder}" set to go off in ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            } else {
                return "No reminders have been set";
            }
        },
        allReminders: (state) => {
            if (state.reminders[0]) {
                let reminders = "";
                state.reminders.forEach((obj) => {
                    reminders += `${obj.reminder} @ ${obj.time}
                    `;
                });
                return reminders;
            } else {
                return "No reminders have been set";
            }
        },
    },
});
