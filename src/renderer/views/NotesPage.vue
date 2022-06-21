<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { NotesView, Note } from "@domain";
    import { invoke } from "@helpers";
    import { NoteArgs, NoteModel } from "@interfaces";

    const selectedNote = ref();
    const notes = ref();

    onMounted(async () => {
        notes.value = await invoke("getNotes");
    });

    const selectNote = (note: NoteModel) => {
        selectedNote.value = note;
    };
    const createNote = async (args: NoteArgs) => {
        const response = await invoke("createNote", args);
        notes.value = response;
    };
    const updateNote = (note: NoteModel) => {
        console.log(note);
    };
    const deleteNote = (note: NoteModel) => {
        console.log(note);
    };
</script>

<template>
    <main class="notes-page">
        <NotesView :notes="notes" @select="selectNote" @create="createNote" @delete="deleteNote" />
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
