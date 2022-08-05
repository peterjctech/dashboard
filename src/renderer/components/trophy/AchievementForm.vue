<script setup lang="ts">
    import { ref } from "vue";
    import { useTrophy } from "@store";
    import { useForm, useHotkey } from "@hooks";
    import { NDatePicker } from "naive-ui";
    import dayjs from "dayjs";

    const trophyStore = useTrophy();
    const { inputRef, focusInput } = useForm();
    const types = trophyStore.achievementTypes.map((obj) => {
        return {
            label: obj.category,
            value: obj.category_id,
        };
    });

    const formData = ref({
        achievement: "",
        timestamp: dayjs().unix() * 1000,
        category_id: "",
    });

    const submit = () => {
        trophyStore.createAchievement({ ...formData.value, timestamp: formData.value.timestamp / 1000 });
        formData.value.achievement = "";
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
        <label>Achievement</label>
        <Input v-model:value="formData.achievement" ref="inputRef" placeholder="Achievement" />
        <label>Type</label>
        <Select v-model:value="formData.category_id" :options="types" filterable placeholder="Type" />
        <label>Date</label>
        <NDatePicker v-model:value="formData.timestamp" />
    </Form>
</template>
