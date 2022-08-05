import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Habit, Shopping, HabitProps, ShoppingProps, Note, NoteProps } from "@types";
import { useGeneral } from "@store";
import dayjs from "dayjs";

interface NotebookStoreState {
    habits: Habit[];
    shopping_list: Shopping[];
    notes: Note[];
}

const useNotebook = defineStore("notebookStore", {
    state: (): NotebookStoreState => {
        return {
            habits: [],
            shopping_list: [],
            notes: [],
        };
    },
    actions: {
        async initStore() {
            const habits: Habit[] = await invoke("getHabits");
            const shopping_list: Shopping[] = await invoke("getShoppingList");
            const notes: Note[] = await invoke("getNotes");

            this.habits = habits;
            this.shopping_list = shopping_list;
            this.notes = notes;

            this.sortHabits();
            this.sortNotes();
        },
        async createHabit(props: HabitProps) {
            const response: Habit = await invoke("createHabit", props);
            if (response) {
                this.habits.push(response);
                this.handleHabit(response, true);
                this.sortHabits();
            }
        },
        async checkHabit(props: Habit) {
            const response: Habit = await invoke("checkHabit", props);
            if (response) {
                this.habits = this.habits.map((obj) => (obj.habit_id === response.habit_id ? response : obj));
                if (response.next_due < dayjs().endOf("day").unix()) {
                    this.handleHabit(response, true);
                }
            }
        },
        async deleteHabit(props: Habit) {
            const response: string = await invoke("deleteHabit", props);
            this.habits = this.habits.filter((obj) => obj.habit_id !== response);
            const generalStore = useGeneral();
            generalStore.deleteNotification(response);
        },
        async createNote(props: NoteProps) {
            const response: Note = await invoke("createNote", props);
            if (response) {
                this.notes.push(response);
                this.sortNotes();
            }
        },
        async updateNote(props: Note) {
            const response: Note = await invoke("updateNote", props);
            this.notes = this.notes.map((obj) => (obj.note_id === response.note_id ? response : obj));
        },
        async deleteNote(props: Note) {
            const response: string = await invoke("deleteNote", props);
            this.notes = this.notes.filter((obj) => obj.note_id !== response);
        },
        async createShoppingItem(props: ShoppingProps) {
            const response: Shopping = await invoke("createShoppingItem", props);
            if (response) this.shopping_list.push(response);
        },
        async deleteShoppingItem(props: Shopping) {
            const response: string = await invoke("deleteShoppingItem", props);
            this.shopping_list = this.shopping_list.filter((obj) => obj.item_id !== response);
        },
        sortHabits() {
            this.habits = this.habits.sort((a, b) => a.next_due - b.next_due);
        },
        sortNotes() {
            this.notes = this.notes.sort((a, b) => a.timestamp - b.timestamp);
        },
        handleHabit(props: Habit, update: boolean) {
            const generalStore = useGeneral();
            let message = props.next_due > dayjs().endOf("day").unix() ? "" : `Due habit: ${props.habit}`;
            const hasNotif = generalStore.checkForNotification(props.habit_id);

            if (hasNotif && !message) {
                generalStore.deleteNotification(props.habit_id);
            } else if (!hasNotif && message) {
                generalStore.addNotification({
                    id: props.habit_id,
                    color: "green",
                    redirect: "/notebook",
                    timestamp: dayjs().startOf("day").hour(generalStore.settings.habit_notify_time).unix(),
                    toDo: `Finish habit: ${props.habit}`,
                    notif: message,
                    update,
                });
            }
        },
    },
});

export default useNotebook;
