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
        event_notify_time: 0,
        goal_notify_time: 0,
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
        generalStore.updateSettings(formData.value);
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
            </tbody>
        </NTable>
    </section>
</template>
