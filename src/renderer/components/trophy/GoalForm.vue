<script setup lang="ts">
    import { ref } from "vue";
    import { useTrophy } from "@store";
    import { useForm, useHotkey } from "@hooks";
    import { format } from "@helpers";

    const trophyStore = useTrophy();
    const { inputRef, focusInput } = useForm();
    const presets = format(["Weekly", "Monthly", "Quarterly", "Yearly"]);

    const isPresetGoal = ref(true);
    const formData = ref({
        goal: "",
        number: 0,
        preset: "",
    });

    const submit = () => {
        trophyStore.createGoal({
            goal: formData.value.goal,
            deadline: isPresetGoal.value ? formData.value.preset : formData.value.number,
        });

        formData.value.goal = "";
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
        <label>Goal</label>
        <Input v-model:value="formData.goal" ref="inputRef" placeholder="Goal" />
        <label>Use preset goal deadline?</label>
        <Switch v-model:value="isPresetGoal" />
        <label>Choose a preset of number of days from now</label>
        <section>
            <Select
                v-model:value="formData.preset"
                :options="presets"
                filterable
                :disabled="!isPresetGoal"
                placeholder="Preset"
            />
            <InputNumber v-model:value="formData.number" :disabled="isPresetGoal" placeholder="Days from now" />
        </section>
    </Form>
</template>
