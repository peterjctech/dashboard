<script setup lang="ts">
    import { useReminders } from "@store";
    import { ref } from "vue";
    import { useDialog } from "naive-ui";
    import { NSwitch } from "naive-ui";
    import { invoke } from "@helpers";

    const dialog = useDialog();
    const reminderStore = useReminders();
    const reminderData = ref({
        reminder: "",
        isRelative: true,
        hour: 0,
        minute: 0,
    });

    const getNextReminder = () => {
        dialog.info({
            title: "Next Reminder",
            content: reminderStore.formattedTimeLeft,
        });
    };
    const checkAllReminders = () => {
        dialog.info({
            title: "Reminders",
            content: reminderStore.allReminders,
        });
    };

    const clearAllReminders = () => {
        dialog.error({
            title: "Clear all reminders?",
            content: "Are you sure you want to delete all reminders?",
            positiveText: "Clear",
            negativeText: "Take me back",
            onPositiveClick: async () => {
                await invoke("clearReminders");
                reminderStore.reminders = [];
            },
        });
    };
</script>

<template>
    <Card class="reminders form">
        <div class="reminders__buttons">
            <Button @click="getNextReminder" type="primary">Check Next Reminder</Button>
            <Button @click="checkAllReminders" type="info">Check All Reminders</Button>
            <Button @click="clearAllReminders" type="error">Clear All Reminders</Button>
        </div>
        <h6>New Reminder</h6>
        <Input v-model:value="reminderData.reminder" />
        <h6>Use relative time? (x hours/minutes from now, as opposed to next instance of hour:minute)</h6>
        <NSwitch v-model:value="reminderData.isRelative" />
        <h6>Hours : Minutes</h6>
        <section>
            <InputNumber v-model:value="reminderData.hour" />
            <InputNumber v-model:value="reminderData.minute" :step="15" />
        </section>
        <Button @click="reminderStore.createReminder(reminderData)" type="success" class="form__button">
            Submit
        </Button>
        <br />
    </Card>
</template>

<style lang="scss">
    .reminders {
        &__buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
        }
    }
</style>
