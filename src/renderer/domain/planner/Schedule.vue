<script setup lang="ts">
    import { h, PropType, ref } from "vue";
    import { EventModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash, Eye } from "@vicons/ionicons5";
    import { NModal } from "naive-ui";

    const showModal = ref(false);
    const modalContent = ref<EventModel>({
        event_id: "",
        event: "",
        description: "",
        timestamp: 0,
        date: "",
        category_id: "",
        category: "",
        class: "",
    });

    defineProps({
        events: Array as PropType<EventModel[]>,
    });
    const emit = defineEmits(["delete"]);

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
            title: "Date",
            key: "date",
            width: 320,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: EventModel) {
                return h(IconButton, { onClick: () => emit("delete", row), type: "error" }, () => h(Trash));
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="events" :row-class-name="(row: EventModel) => row.class" flex-height />
    <NModal
        v-model:show="showModal"
        :title="`${modalContent.event} [${modalContent.category}]`"
        preset="card"
        class="form-modal"
    >
        <h5>{{ modalContent.date }}</h5>
        <h6>{{ modalContent.description }}</h6>
    </NModal>
</template>
