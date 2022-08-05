<script setup lang="ts">
    import { Notifications, Close, Checkmark } from "@vicons/ionicons5";
    import { useGeneral } from "@store";
    import { onMounted, ref, watch } from "vue";
    import { NBadge } from "naive-ui";
    import { Notification } from "@types";
    import { useDataTable } from "@hooks";

    const generalStore = useGeneral();
    const showModal = ref(false);

    const updateBadge = (value: number) => {
        window.electron.ipcRenderer.sendSync("update-badge", value);
    };

    onMounted(() => {
        updateBadge(generalStore.notifications.filter((obj) => obj.is_notified && !obj.is_read).length);
    });

    watch(
        () => generalStore.notifications.filter((obj) => obj.is_notified && !obj.is_read).length,
        (value) => updateBadge(value)
    );

    const columns = [
        useDataTable.conditionalIcon({
            title: "Read",
            types: ["error", "success"],
            click: (row: Notification) => generalStore.toggleNotification(row.id),
            icons: [Close, Checkmark],
            condition: "is_read",
        }),
        { title: "Notifications", key: "message" },
        { title: "Time", key: "time", width: 100 },
    ];

    const openNotifications = () => {
        generalStore.readAllNotifications();
        showModal.value = true;
    };
    const checkClick = (event: Event) => {
        if ((event.target as HTMLInputElement).className === "notifications__modal") showModal.value = false;
    };
</script>

<template>
    <div @click="openNotifications" class="notifications">
        <Icon variant="icon" :size="48">
            <NBadge :value="generalStore.notifications.filter((obj) => !obj.is_read && obj.is_notified).length">
                <Notifications
                    :class="
                        !generalStore.notifications.filter((obj) => !obj.is_read && obj.is_notified).length
                            ? 'black'
                            : ''
                    "
                />
            </NBadge>
        </Icon>
    </div>
    <div v-if="showModal" @click="checkClick" class="notifications__modal">
        <DataTable
            :data="generalStore.notifications.filter((obj) => obj.is_notified)"
            :columns="columns"
            row-class-name="magenta"
            flex-height
            class="notifications__table"
        />
    </div>
</template>

<style lang="scss">
    .notifications {
        cursor: pointer;
        display: grid;
        place-items: center;
        margin-bottom: 1rem;

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
