<script setup lang="ts">
    import { ref, PropType } from "vue";
    import { NTabs as Tabs, NTabPane as TabPane, NDatePicker, NSwitch } from "naive-ui";
    import { EventArgs } from "@interfaces";
    import dayjs from "dayjs";

    defineProps({
        categories: {
            type: Array as PropType<{ label: string; value: string }[]>,
            default: [],
        },
        presets: {
            type: Array as PropType<{ label: string; value: string }[]>,
            default: [],
        },
    });
    const emit = defineEmits(["goal", "event"]);

    const isPresetGoal = ref(true);
    const eventData = ref<EventArgs>({
        event: "",
        description: "",
        date: dayjs().startOf("day").unix() * 1000,
        hour: 0,
        minute: 0,
    });
    const goalData = ref({
        goal: "",
        deadlinePreset: "Weekly",
        deadlineNumber: 0,
    });

    const parseGoal = () => {
        const data = goalData.value;
        const deadline = isPresetGoal.value ? data.deadlinePreset : data.deadlineNumber;
        emit("goal", { goal: data.goal, deadline });
    };
</script>

<template>
    <Card>
        <Tabs>
            <TabPane name="Event">
                <div class="form">
                    <h6>Event</h6>
                    <Input v-model:value="eventData.event" />
                    <h6>Description</h6>
                    <Input v-model:value="eventData.description" />
                    <h6>Date</h6>
                    <NDatePicker v-model:value="eventData.date" type="date" />
                    <h6>Time [Hour / Minute]</h6>
                    <section>
                        <InputNumber v-model:value="eventData.hour" :min="0" :max="23" />
                        <InputNumber v-model:value="eventData.minute" :min="0" :max="59" :step="15" />
                    </section>
                    <Button @click="$emit('event', eventData)" type="success" class="form__button">Submit</Button>
                </div>
            </TabPane>
            <TabPane name="Goal">
                <div class="form">
                    <h6>Goal</h6>
                    <Input v-model:value="goalData.goal" />
                    <h6>Use preset goal deadline?</h6>
                    <NSwitch v-model:value="isPresetGoal" />
                    <h6>Choose a preset or number of days from now</h6>
                    <section>
                        <Select v-model:value="goalData.deadlinePreset" :disabled="!isPresetGoal" :options="presets" />
                        <InputNumber v-model:value="goalData.deadlineNumber" :disabled="isPresetGoal" />
                    </section>
                    <Button @click="parseGoal" type="success" class="form__button">Submit</Button>
                </div>
            </TabPane>
        </Tabs>
    </Card>
</template>
