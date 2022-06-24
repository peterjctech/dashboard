<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { Notes, Note } from "@domain";
    import { invoke } from "@helpers";
    import { NoteArgs, NoteModel } from "@interfaces";

    const selectedNote = ref();
    const notes = ref();

    onMounted(async () => (notes.value = await invoke("getNotes")));

    const selectNote = (note: NoteModel) => (selectedNote.value = note);
    const createNote = async (args: NoteArgs) => {
        const response = await invoke("createNote", args);
        notes.value = response;
    };
    const updateNote = async (note: NoteModel) => {
        const response = await invoke("updateNote", note);
        const currentId = selectedNote.value.note_id;
        if (response) {
            notes.value = response;
            selectedNote.value = notes.value.find((obj: NoteModel) => obj.note_id === currentId);
        }
    };
    const deleteNote = async (note: NoteModel) => {
        const response = await invoke("deleteNote", note);
        if (response) {
            notes.value = notes.value.filter((obj: NoteModel) => obj.note_id !== response);
        }
    };
</script>

<template>
    <main class="notes-page">
        <Notes :notes="notes" @select="selectNote" @create="createNote" @delete="deleteNote" />
        <Note :note="selectedNote" @update="updateNote" />
    </main>
</template>

<style lang="scss">
    .notes-page {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        gap: 2rem;

        > :nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }
        > :nth-child(2) {
            grid-area: 1 / 2 / 2 / 5;
        }
    }
</style>
