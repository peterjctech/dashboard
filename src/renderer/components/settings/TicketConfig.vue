<script setup lang="ts">
    import { ref } from "vue";
    import { useTickets } from "@store";
    import { useableColors, format } from "@helpers";
    import { useForm, useDataTable } from "@hooks";
    import { Category } from "@types";
    import { Pencil, Trash } from "@vicons/ionicons5";

    const ticketStore = useTickets();
    const { inputRef, focusInput } = useForm();
    const colors = format(useableColors);

    const selectedCategory = ref({
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
        { title: "Category", key: "category" },
        useDataTable.icon({
            title: "Edit",
            type: "warning",
            click: (row: Category) => (selectedCategory.value = JSON.parse(JSON.stringify(row))),
            icon: Pencil,
        }),
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Category) => ticketStore.deleteTicketCategory(row),
            icon: Trash,
        }),
    ];

    const submit = () => {
        ticketStore.createTicketCategory({ ...formData.value, for: "Tickets" });
        formData.value.category = "";
        focusInput();
    };
</script>

<template>
    <Form title="New Category" @submit="submit">
        <label>Ticket Category</label>
        <Input v-model:value="formData.category" placeholder="Ticket Category" ref="inputRef" />
        <label>Color</label>
        <Select v-model:value="formData.color" :options="colors" filterable placeholder="Color" />
    </Form>
    <DataTable
        :data="ticketStore.ticketCategories"
        :columns="columns"
        :row-class-name="(row: Category) => row.color"
        flex-height
    />
    <Form
        v-if="selectedCategory.category_id"
        title="Update Category"
        @submit="ticketStore.updateTicketCategory(selectedCategory)"
    >
        <label>Ticket Category</label>
        <Input v-model:value="selectedCategory.category" placeholder="Ticket Category" ref="inputRef" />
        <label>Color</label>
        <Select v-model:value="selectedCategory.color" :options="colors" filterable placeholder="Color" />
    </Form>
</template>
