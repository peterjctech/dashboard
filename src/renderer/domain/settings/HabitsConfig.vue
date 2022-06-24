<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { HabitModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    defineProps({
        classes: Array as PropType<{ label: string; value: string }[]>,
    });

    const habits: any = ref();
    const habitData = ref({
        habit: "",
        margin: 1,
        class: "",
    });
    const selectedHabit = ref({
        habit_id: "",
        habit: "",
        margin: 0,
        last_completed: 0,
        last_broken: 0,
        timestamp: 0,
        class: "",
        created_at: "",
    });

    onMounted(async () => {
        habits.value = await invoke("getHabits");
    });

    const createHabit = async () => {
        habits.value.push(await invoke("createHabit", habitData.value));
    };
    const updateHabit = async () => {
        const response = await invoke("updateHabit", selectedHabit.value);
        if (response) {
            habits.value = habits.value.map((obj: HabitModel) => {
                return obj.habit_id === response.habit_id ? response : obj;
            });
        }
    };

    const columns = [
        {
            title: "Habit",
            key: "habit",
        },
        {
            title: "Check-in Margin",
            key: "margin",
            width: 130,
            render: (row: HabitModel) => {
                return row.margin === 1 ? `${row.margin} day` : `${row.margin} days`;
            },
        },
        {
            title: "Created At",
            key: "created_at",
            width: 280,
        },
        {
            title: "Update",
            key: "update",
            render(row: HabitModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            selectedHabit.value = row;
                        },
                        type: "warning",
                    },
                    () => h(Pencil)
                );
            },
            width: 80,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: HabitModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteHabit", row);
                            habits.value = habits.value.filter((obj: HabitModel) => obj.habit_id !== response);
                        },
                        type: "error",
                    },
                    () => h(Trash)
                );
            },
            width: 80,
        },
    ];
</script>

<template>
    <div class="form">
        <h4>New Habit</h4>
        <h6>Habit</h6>
        <Input v-model:value="habitData.habit" />
        <h6>Check-in Margin</h6>
        <InputNumber v-model:value="habitData.margin" />
        <h6>Color (optional)</h6>
        <Select v-model:value="habitData.class" :options="classes" />
        <Button @click="createHabit" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="habits" :columns="columns" :row-class-name="(row: HabitModel) => row.class" flex-height />
    <div class="form">
        <h4>{{ selectedHabit.habit_id ? "Update Habit" : "Select a habit to update" }}</h4>
        <h6>Habit</h6>
        <Input v-model:value="selectedHabit.habit" />
        <h6>Check-in Margin</h6>
        <InputNumber v-model:value="selectedHabit.margin" />
        <h6>Class</h6>
        <Select v-model:value="selectedHabit.class" :options="classes" />
        <Button
            @click="updateHabit"
            type="success"
            class="form__button"
            :disabled="selectedHabit.habit_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
