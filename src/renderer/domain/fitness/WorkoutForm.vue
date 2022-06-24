<script setup lang="ts">
    import { ActivityModel } from "@interfaces";
    import { PropType, ref, watch } from "vue";

    const selectedActivity = ref();
    const selectedType = ref("");

    const props = defineProps({
        activities: {
            type: Array as PropType<ActivityModel[]>,
            default: [],
        },
        options: Array as PropType<{ label: string; value: string }[]>,
    });
    const emit = defineEmits(["create"]);

    watch(
        () => selectedActivity.value,
        () => {
            const activity = props.activities.find((obj: ActivityModel) => obj.activity_id === selectedActivity.value);
            if (activity) selectedType.value = activity.type;
            console.log(selectedType.value);
        }
    );

    const workoutData = ref({
        count: 0,
        hour: 0,
        minute: 0,
        second: 0,
        other: "",
    });

    const createWorkout = async () => {
        let value;
        switch (selectedType.value) {
            case "":
                break;
            case "General Workout":
                value = workoutData.value.other;
                break;
            case "Count":
                value = workoutData.value.count;
                break;
            default:
                value = [workoutData.value.hour, workoutData.value.minute, workoutData.value.second];
                break;
        }
        const activity = props.activities.find((obj: ActivityModel) => obj.activity_id === selectedActivity.value);
        if (!activity) return;
        emit("create", { value, activity_id: activity.activity_id, type: selectedType.value });
    };
</script>

<template>
    <Card>
        <div class="form">
            <h4>New Workout</h4>
            <h6>Activity</h6>
            <Select v-model:value="selectedActivity" :options="options" />
            <h6>
                {{ selectedType }}
                {{ selectedType === "Duration" || selectedType === "Timed" ? "[Hours / Minutes / Seconds]" : "" }}
            </h6>
            <InputNumber v-if="selectedType === 'Count'" v-model:value="workoutData.count" />
            <section v-else-if="selectedType === 'Duration' || selectedType === 'Timed'">
                <InputNumber v-model:value="workoutData.hour" />
                <InputNumber v-model:value="workoutData.minute" />
                <InputNumber v-model:value="workoutData.second" />
            </section>
            <Input v-else v-model:value="workoutData.other" />
            <Button @click="createWorkout" type="success" class="form__button">Submit</Button>
        </div>
    </Card>
</template>
