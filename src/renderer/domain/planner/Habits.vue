<script setup lang="ts">
    import { h, onMounted, ref } from "vue";
    import { invoke } from "@helpers";
    import { HabitModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Checkmark } from "@vicons/ionicons5";

    const habits = ref();

    onMounted(async () => {
        habits.value = await invoke("getHabits");
    });

    const columns = [
        {
            title: "Habit",
            key: "habit",
        },
        {
            title: "Margin",
            key: "margin",
            render(row: HabitModel) {
                return row.margin === 1 ? "1 day" : `${row.margin} days`;
            },
            width: 120,
        },
        {
            title: "Next Deadline",
            key: "next_deadline_string",
            width: 320,
        },
        {
            title: "Streak",
            key: "streak",
            width: 120,
        },
        {
            title: "Check In",
            key: "check",
            render(row: HabitModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("checkInHabit", row);
                            habits.value = response;
                        },
                        type: "primary",
                    },
                    () => h(Checkmark)
                );
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="habits" :row-class-name="(row: HabitModel) => row.class" flex-height />
</template>
