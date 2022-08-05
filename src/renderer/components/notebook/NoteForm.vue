<script setup lang="ts">
    import { ref } from "vue";
    import { useForm } from "@hooks";
    import { useNotebook } from "@store";

    const notebookStore = useNotebook();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        title: "",
        note: "",
    });

    const submit = () => {
        notebookStore.createNote(formData.value);
        formData.value.title = "";
        formData.value.note = "";
        focusInput();
    };
</script>

<template>
    <Form @submit="submit">
        <label>Title</label>
        <Input v-model:value="formData.title" placeholder="Title" />
        <label>Note</label>
        <Input v-model:value="formData.note" ref="inputRef" placeholder="Note" />
    </Form>
</template>
