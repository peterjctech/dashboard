<script setup lang="ts">
    import { ref } from "vue";
    import { useForm } from "@hooks";
    import { useTime } from "@store";

    const timeStore = useTime();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        reminder: "",
        hour: 0,
        minute: 30,
        isRelative: true,
    });

    const submit = () => {
        timeStore.createReminder(formData.value);
        formData.value.reminder = "";
        focusInput();
    };
</script>

<template>
    <Form @submit="submit">
        <label>Reminder</label>
        <Input v-model:value="formData.reminder" ref="inputRef" />
        <label>Use relative time? (x hours/minutes from now, as opposed to next instance of hour:minute)</label>
        <Switch v-model:value="formData.isRelative" />
        <label>Hours : Minutes</label>
        <section>
            <InputNumber v-model:value="formData.hour" />
            <InputNumber v-model:value="formData.minute" :step="15" />
        </section>
    </Form>
</template>
