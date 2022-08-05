<script setup lang="ts">
    import { PropType } from "vue";

    defineProps({
        count: Number,
        categories: Array as PropType<{ label: string; value: string }[]>,
    });
</script>

<template>
    <div class="ticket-filters">
        <h5>{{ count }} {{ count === 1 ? "ticket" : "tickets" }} remaining</h5>
        <section>
            <Button @click="$emit('filter', -2)" type="error">Overdue Tickets</Button>
            <Button @click="$emit('filter', -1)" type="warning">Due Today</Button>
            <Button @click="$emit('filter', 1)" type="success">Focused</Button>
            <Button @click="$emit('filter', 2)" type="info">Unfocused</Button>
            <Button @click="$emit('filter', 0)" type="error">Reset Filter</Button>
        </section>
        <section>
            <Button v-for="category in categories" @click="$emit('filter', category.value)" type="primary">
                {{ category.label }}
            </Button>
        </section>
    </div>
</template>

<style lang="scss">
    .ticket-filters {
        grid-area: 1 / 1 / 2 / 4;
        position: relative;

        section {
            display: flex;
        }

        button {
            margin: 1rem;
        }

        h5 {
            color: $neutral-1;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
</style>
