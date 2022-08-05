<script setup lang="ts">
    import { ref } from "vue";
    import { useForm } from "@hooks";
    import { useNotebook } from "@store";

    const notebookStore = useNotebook();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        habit: "",
        frequency: 1,
    });

    const submit = () => {
        notebookStore.createHabit(formData.value);
        formData.value.habit = "";
        focusInput();
    };
</script>

<template>
    <Form @submit="submit">
        <label>Habit</label>
        <Input v-model:value="formData.habit" placeholder="Habit" ref="inputRef" />
        <label>Frequency</label>
        <InputNumber v-model:value="formData.frequency" placeholder="Frequency" :min="1" />
    </Form>
</template>
