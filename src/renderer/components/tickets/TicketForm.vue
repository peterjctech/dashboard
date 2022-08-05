<script setup lang="ts">
    import { ref, PropType } from "vue";
    import { useTickets } from "@store";
    import { useForm, useHotkey } from "@hooks";

    const ticketStore = useTickets();
    const { inputRef, focusInput } = useForm();

    const formData = ref({
        ticket: "",
        deadline: 0,
        category_id: "",
    });

    defineProps({
        categories: Array as PropType<{ label: string; value: string }[]>,
    });

    const submit = async () => {
        await ticketStore.createTicket(formData.value);
        formData.value.ticket = "";
        focusInput();
    };

    useHotkey({
        code: "Enter",
        callback: submit,
        ctrl: true,
    });
</script>

<template>
    <Card>
        <Form title="New Ticket" @submit="submit">
            <label>Ticket</label>
            <Input v-model:value="formData.ticket" ref="inputRef" placeholder="Ticket" />
            <label>Deadline</label>
            <InputNumber v-model:value="formData.deadline" placeholder="Deadline" />
            <label>Category</label>
            <Select v-model:value="formData.category_id" :options="categories" filterable placeholder="Category" />
        </Form>
    </Card>
</template>
