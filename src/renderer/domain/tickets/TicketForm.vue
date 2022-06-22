<script setup lang="ts">
    import { ref, PropType } from "vue";

    defineProps({
        categories: {
            type: Array as PropType<{ label: string; value: string }[]>,
            default: [],
        },
    });

    const ticketData = ref({
        ticket: "",
        deadline: 0,
        category_id: "",
    });
</script>

<template>
    <Card>
        <div class="form">
            <h4>New Ticket</h4>
            <h6>Ticket</h6>
            <Input v-model:value="ticketData.ticket" />
            <h6>Deadline</h6>
            <InputNumber v-model:value="ticketData.deadline" />
            <h6>Category</h6>
            <Select v-model:value="ticketData.category_id" :options="categories" />
            <Button @click="$emit('create', ticketData)" type="success" class="form__button">Submit</Button>
        </div>
    </Card>
</template>
