<script setup lang="ts">
    import { useDataTable } from "@hooks";
    import { useNotebook } from "@store";
    import { Shopping } from "@types";
    import { Trash } from "@vicons/ionicons5";

    const notebookStore = useNotebook();

    const columns = [
        { title: "Item", key: "item" },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Shopping) => notebookStore.deleteShoppingItem(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable
        :data="notebookStore.shopping_list"
        :columns="columns"
        :row-class-name="(row: Shopping) => row.color"
        flex-height
    />
</template>
