<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { ActivityModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    defineProps({
        classes: Array as PropType<{ label: string; value: string }[]>,
        types: Array as PropType<{ label: string; value: string }[]>,
    });

    const activities: any = ref();
    const activityData = ref({
        activity: "",
        type: "",
        class: "",
    });
    const selectedActivity = ref({
        activity_id: "",
        activity: "",
        type: "",
        class: "",
    });

    onMounted(async () => {
        activities.value = await invoke("getActivities");
    });

    const createActivity = async () => {
        activities.value.push(await invoke("createActivity", activityData.value));
    };
    const updateActivity = async () => {
        const response = await invoke("updateActivity", selectedActivity.value);
        if (response) {
            activities.value = activities.value.map((obj: ActivityModel) => {
                return obj.activity_id === response.activity_id ? response : obj;
            });
        }
    };

    const columns = [
        {
            title: "Activity",
            key: "activity",
        },
        {
            title: "Type",
            key: "type",
            width: 100,
        },
        {
            title: "Update",
            key: "update",
            render(row: ActivityModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            selectedActivity.value = row;
                        },
                        type: "warning",
                    },
                    () => h(Pencil)
                );
            },
            width: 80,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: ActivityModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteActivity", row);
                            activities.value = activities.value.filter(
                                (obj: ActivityModel) => obj.activity_id !== response
                            );
                        },
                        type: "error",
                    },
                    () => h(Trash)
                );
            },
            width: 80,
        },
    ];
</script>

<template>
    <div class="form">
        <h4>New Activity</h4>
        <h6>Activity</h6>
        <Input v-model:value="activityData.activity" />
        <h6>Type</h6>
        <Select v-model:value="activityData.type" :options="types" />
        <h6>Class (optional)</h6>
        <Select v-model:value="activityData.class" :options="classes" />
        <Button @click="createActivity" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="activities" :columns="columns" :row-class-name="(row: ActivityModel) => row.class" flex-height />
    <div class="form">
        <h4>{{ selectedActivity.activity_id ? "Update Activity" : "Select an activity to update" }}</h4>
        <h6>Type: {{ selectedActivity.type }}</h6>
        <h6>Activity</h6>
        <Input v-model:value="selectedActivity.activity" />
        <h6>Class</h6>
        <Select v-model:value="selectedActivity.class" :options="classes" />
        <Button
            @click="updateActivity"
            type="success"
            class="form__button"
            :disabled="selectedActivity.activity_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
