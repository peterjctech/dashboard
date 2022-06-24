<script setup lang="ts">
    import { onMounted, h, PropType, ref } from "vue";
    import { EventModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash, Eye } from "@vicons/ionicons5";
    import { NModal } from "naive-ui";
    import { invoke } from "@helpers";

    const showModal = ref(false);
    const modalContent = ref<EventModel>({
        event_id: "",
        event: "",
        description: "",
        timestamp: 0,
        date: "",
        status: "",
        class: "",
    });
    const events = ref();

    onMounted(async () => {
        events.value = await invoke("getUpcomingEvents");
    });

    const columns = [
        {
            title: "View",
            key: "view",
            render(row: EventModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            modalContent.value = row;
                            showModal.value = true;
                        },
                        type: "primary",
                    },
                    () => h(Eye)
                );
            },
            width: 80,
        },
        {
            title: "Event",
            key: "event",
        },
        {
            title: "Status",
            key: "status",
            width: 120,
        },
        {
            title: "Date",
            key: "date",
            width: 240,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: EventModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteEvent", row);
                            events.value = events.value.filter((obj: EventModel) => obj.event_id !== response);
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
    <DataTable :columns="columns" :data="events" :row-class-name="(row: EventModel) => row.class" flex-height />
    <NModal v-model:show="showModal" :title="modalContent.event" preset="card" class="form-modal">
        <h5>{{ modalContent.date }}</h5>
        <h6>{{ modalContent.description }}</h6>
    </NModal>
</template>
