<script setup lang="ts">
    import { ref } from "vue";
    import { useMisc } from "@store";
    import { useForm, useDataTable } from "@hooks";
    import { Quote } from "@types";
    import { Trash } from "@vicons/ionicons5";

    const miscStore = useMisc();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        quote: "",
        author: "",
    });

    const columns = [
        { title: "Quote", key: "quote" },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Quote) => miscStore.deleteQuote(row),
            icon: Trash,
        }),
    ];

    const submit = () => {
        miscStore.createQuote(formData.value);
        formData.value.quote = "";
        focusInput();
    };
</script>

<template>
    <Form title="New Quote" @submit="submit">
        <label>Quote</label>
        <Input v-model:value="formData.quote" placeholder="Quote" ref="inputRef" />
        <label>Author</label>
        <Input v-model:value="formData.author" placeholder="Author" />
    </Form>
    <DataTable :data="miscStore.quotes" :columns="columns" row-class-name="magenta" flex-height />
</template>
