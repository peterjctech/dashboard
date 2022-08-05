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
</script>

<template>
    <Form @submit="generalStore.updateSettings(formData)">
        <label>Ticket Notification Time</label>
        <Select v-model:value="formData.ticket_notify_time" :options="times" placeholder="Ticket Notification Time" />
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
                    <td>Ticket Notification Time</td>
                    <td>{{ generalStore.settings.ticket_notify_time }}:00</td>
                </tr>
            </tbody>
        </NTable>
    </section>
</template>
