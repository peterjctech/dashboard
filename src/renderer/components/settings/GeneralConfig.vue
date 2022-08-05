<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useGeneral } from "@store";
    import { NTable } from "naive-ui";
    import { Settings } from "@types";

    const generalStore = useGeneral();
    const formData = ref<Settings>({
        database_version: 0,
        app_version: "",
        ticket_notify_time: 0,
        event_warning_time: 0,
        goal_notify_time: 0,
        habit_notify_time: 0,
        zip_code: 0,
        latitude: 0,
        longitude: 0,
    });

    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(i);
    }

    const times = hours.map((num) => {
        return {
            label: `${num}:00`,
            value: num,
        };
    });

    const eventTimes = [
        { label: "1 hour", value: 1 },
        { label: "2 hours", value: 2 },
        { label: "3 hours", value: 3 },
    ];

    onMounted(() => {
        formData.value = JSON.parse(JSON.stringify(generalStore.settings));
    });

    const submit = async () => {
        if (formData.value.zip_code !== generalStore.settings.zip_code) {
            const response = await generalStore.fetchCoordinates(formData.value.zip_code);
            if (response) {
                formData.value.latitude = response.latitude;
                formData.value.longitude = response.longitude;
            } else {
                formData.value.zip_code = generalStore.settings.zip_code;
            }
        }
        await generalStore.updateSettings(formData.value);
    };
</script>

<template>
    <Form @submit="submit">
        <label>Zip Code</label>
        <InputNumber v-model:value="formData.zip_code" placeholder="Zip Code" />
        <label>Ticket Notification Time</label>
        <Select v-model:value="formData.ticket_notify_time" :options="times" placeholder="Ticket Notification Time" />
        <label>Goal Notification Time</label>
        <Select v-model:value="formData.goal_notify_time" :options="times" placeholder="Goal Notification Time" />
        <label>Event Warning Time</label>
        <Select v-model:value="formData.event_warning_time" :options="eventTimes" placeholder="Event Warning Time" />
        <label>Habit Notify Time</label>
        <Select v-model:value="formData.habit_notify_time" :options="times" placeholder="Habit Notify Time" />
    </Form>
    <section>
        <NTable :single-line="false" striped>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Zip Code</td>
                    <td>{{ generalStore.settings.zip_code }}</td>
                </tr>
                <tr>
                    <td>Latitude</td>
                    <td>{{ generalStore.settings.latitude }}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>{{ generalStore.settings.longitude }}</td>
                </tr>
                <tr>
                    <td>Ticket Notification Time</td>
                    <td>{{ generalStore.settings.ticket_notify_time }}:00</td>
                </tr>
                <tr>
                    <td>Goal Notification Time</td>
                    <td>{{ generalStore.settings.goal_notify_time }}:00</td>
                </tr>
                <tr>
                    <td>Event Warning Time</td>
                    <td>{{ generalStore.settings.event_warning_time }} hours</td>
                </tr>
                <tr>
                    <td>Habit Notify Time</td>
                    <td>{{ generalStore.settings.habit_notify_time }}:00</td>
                </tr>
            </tbody>
        </NTable>
    </section>
</template>
