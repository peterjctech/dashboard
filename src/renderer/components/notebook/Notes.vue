<script setup lang="ts">
    import { Trash } from "@vicons/ionicons5";
    import { useDataTable } from "@hooks";
    import { Note } from "@types";
    import { useNotebook } from "@store";

    const notebookStore = useNotebook();

    const columns = [
        { title: "Title", key: "title" },
        { title: "Last Updated", key: "updated_at", width: 150 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Note) => notebookStore.deleteNote(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable :data="notebookStore.notes" :columns="columns" :row-class-name="(row: Note) => row.color" flex-height />
</template>
