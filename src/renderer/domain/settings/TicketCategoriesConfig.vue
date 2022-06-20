<script setup lang="ts">
    import { ref } from "vue";
    import { AddButton } from "@components";

    const showModal = ref(false);
</script>

<template>
    <div>
        <h1 class="title">
            Ticket Categories
            <AddButton @click="showModal = true" />
        </h1>
        <Modal v-model:show="showModal">
            <h1>Ticket Categories Form</h1>
        </Modal>
    </div>
</template>
