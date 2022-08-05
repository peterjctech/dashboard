<script setup lang="ts">
    import { AlertCircle, ArrowRedo } from "@vicons/ionicons5";
    import { useGeneral } from "@store";
    import { ref } from "vue";
    import { NBadge } from "naive-ui";
    import { ToDo } from "@types";
    import { useDataTable } from "@hooks";
    import router from "../router";

    const generalStore = useGeneral();
    const showModal = ref(false);

    const columns = [
        useDataTable.icon({
            title: "Redirect",
            type: "primary",
            click: (row: ToDo) => {
                if (row.redirect) router.push({ path: row.redirect });
                showModal.value = false;
            },
            icon: ArrowRedo,
        }),
        { title: "To Do List", key: "message" },
    ];

    const checkClick = (event: Event) => {
        if ((event.target as HTMLInputElement).className === "to-do-list__modal") showModal.value = false;
    };
</script>

<template>
    <div @click="showModal = true" class="to-do-list">
        <Icon variant="icon" :size="48">
            <NBadge :value="generalStore.toDoList.length">
                <AlertCircle :class="!generalStore.toDoList.length ? 'black' : ''" />
            </NBadge>
        </Icon>
    </div>
    <div v-if="showModal" @click="checkClick" class="to-do-list__modal">
        <DataTable
            :data="generalStore.toDoList"
            :columns="columns"
            :row-class-name="(row: ToDo) => row.color"
            flex-height
            class="to-do-list__table"
        />
    </div>
</template>

<style lang="scss">
    .to-do-list {
        cursor: pointer;
        display: grid;
        place-items: center;

        .n-badge-sup {
            left: 10%;
        }

        .black {
            color: $neutral-5;
        }

        &__modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 100;
        }

        &__table {
            position: fixed;
            width: 30% !important;
            height: 50% !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
