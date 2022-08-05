<script setup lang="ts">
    import { ref } from "vue";
    import { useNotebook } from "@store";
    import { useForm, useHotkey } from "@hooks";

    const notebookStore = useNotebook();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        item: "",
    });

    const submit = () => {
        notebookStore.createShoppingItem(formData.value);
        formData.value.item = "";
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
        <label>Item</label>
        <Input v-model:value="formData.item" ref="inputRef" placeholder="Item" />
    </Form>
</template>
