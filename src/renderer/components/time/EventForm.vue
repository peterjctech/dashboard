<script setup lang="ts">
    import { ref } from "vue";
    import { useTime } from "@store";
    import { useForm, useDatePicker, useHotkey } from "@hooks";

    const timeStore = useTime();
    const { inputRef, focusInput } = useForm();
    const { DatePicker, parseTimestamp, time } = useDatePicker();

    const formData = ref({
        event: "",
        description: "",
    });

    const submit = () => {
        const timestamp = parseTimestamp(time.value);
        timeStore.createEvent({ ...formData.value, timestamp });
        formData.value.event = "";
        formData.value.description = "";
        focusInput();
    };

    useHotkey({
        code: "Enter",
        callback: submit,
        ctrl: true,
    });
</script>

<template>
    <Form @submit="submit">
        <label>Event</label>
        <Input v-model:value="formData.event" ref="inputRef" placeholder="Event" />
        <label>Description</label>
        <Input v-model:value="formData.description" placeholder="Description" />
        <label>Date</label>
        <DatePicker />
        <label>Time</label>
        <section>
            <InputNumber v-model:value="time.hour" :min="0" :max="23" placeholder="Hour" />
            <InputNumber v-model:value="time.minute" :min="0" :max="59" :step="15" placeholder="Minute" />
        </section>
    </Form>
</template>
