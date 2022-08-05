<script setup lang="ts">
    import { useDataTable, useDatePicker } from "@hooks";
    import { useTime } from "@store";
    import { Event } from "@types";
    import { Trash, Eye } from "@vicons/ionicons5";
    import { ref, PropType } from "vue";

    const { DatePicker, parseTimestamp, time } = useDatePicker();
    const emptyEvent = {
        event_id: "",
        event: "",
        description: "",
        timestamp: "",
        date: "",
        time: "",
        status: "",
        color: "",
    };
    const timeStore = useTime();
    const selectedEvent = ref(emptyEvent);
    const showModal = ref(false);

    defineProps({
        events: Array as PropType<Event[]>,
        compact: {
            type: Boolean,
            default: false,
        },
    });

    const viewRow = useDataTable.icon({
        title: "View",
        type: "success",
        click: (row: Event) => {
            selectedEvent.value = JSON.parse(JSON.stringify(row));
            showModal.value = true;
        },
        icon: Eye,
    });

    const compactColumns = [
        viewRow,
        { title: "Event", key: "event" },
        { title: "Time", key: "time", width: 100 },
        { title: "Status", key: "status", width: 180 },
    ];

    const columns = [
        viewRow,
        { title: "Event", key: "event" },
        { title: "Date", key: "date", width: 280 },
        { title: "Status", key: "status", width: 180 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Event) => timeStore.deleteEvent(row),
            icon: Trash,
        }),
    ];

    const updateEvent = () => {
        const timestamp = parseTimestamp(time.value);
        timeStore.updateEvent({ ...selectedEvent.value, timestamp });
        selectedEvent.value = emptyEvent;
        showModal.value = false;
    };
</script>

<template>
    <div>
        <DataTable
            :data="events"
            :columns="compact ? compactColumns : columns"
            :row-class-name="(row: Event) => row.color"
            flex-height
        />
        <Modal v-model:show="showModal" preset="card" :title="selectedEvent.date" segmented bordered class="modal">
            <h4>{{ selectedEvent.event }}</h4>
            <br />
            <p>{{ selectedEvent.description }}</p>
            <label>Change Date</label>
            <DatePicker />
            <label>Change Time</label>
            <section>
                <InputNumber v-model:value="time.hour" :min="0" :max="23" placeholder="Hour" />
                <InputNumber v-model:value="time.minute" :min="0" :max="59" :step="15" placeholder="Minute" />
            </section>
            <template #footer>
                <Button @click="updateEvent" type="success">Submit</Button>
            </template>
        </Modal>
    </div>
</template>
