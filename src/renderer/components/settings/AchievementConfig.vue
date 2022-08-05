<script setup lang="ts">
    import { ref } from "vue";
    import { useTrophy } from "@store";
    import { useableColors, format } from "@helpers";
    import { useForm, useDataTable } from "@hooks";
    import { Category } from "@types";
    import { Pencil, Trash } from "@vicons/ionicons5";

    const trophyStore = useTrophy();
    const { inputRef, focusInput } = useForm();
    const colors = format(useableColors);

    const selectedType = ref({
        category_id: "",
        category: "",
        color: "",
        for: "",
    });
    const formData = ref({
        category: "",
        color: "",
    });

    const columns = [
        { title: "Type", key: "category" },
        useDataTable.icon({
            title: "Edit",
            type: "warning",
            click: (row: Category) => (selectedType.value = JSON.parse(JSON.stringify(row))),
            icon: Pencil,
        }),
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Category) => trophyStore.deleteAchievementType(row),
            icon: Trash,
        }),
    ];

    const submit = () => {
        trophyStore.createAchievementType({ ...formData.value, for: "Achievements" });
        formData.value.category = "";
        focusInput();
    };
</script>

<template>
    <Form title="New Achievement Type" @submit="submit">
        <label>Type</label>
        <Input v-model:value="formData.category" placeholder="Type" ref="inputRef" />
        <label>Color</label>
        <Select v-model:value="formData.color" :options="colors" filterable placeholder="Color" />
    </Form>
    <DataTable
        :data="trophyStore.achievementTypes"
        :columns="columns"
        :row-class-name="(row: Category) => row.color"
        flex-height
    />
    <Form v-if="selectedType.category_id" title="Update Type" @submit="trophyStore.updateAchievementType(selectedType)">
        <label>Type</label>
        <Input v-model:value="selectedType.category" placeholder="Type" ref="inputRef" />
        <label>Color</label>
        <Select v-model:value="selectedType.color" :options="colors" filterable placeholder="Color" />
    </Form>
</template>
