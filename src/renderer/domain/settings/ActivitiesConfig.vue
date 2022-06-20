<script setup lang="ts">
    import { ref } from "vue";
    import { AddButton } from "@components";
    import { useFormat } from "@mixins";
    import { invoke } from "@helpers";

    const types = useFormat(["Timed", "Duration", "Sets", "Count"]);
    const classes = useFormat([
        "primary",
        "secondary",
        "tertiary",
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "magenta",
        "pink",
    ]);

    const showModal = ref(false);
    const activityData = ref({
        activity: "",
        type: "",
        class: "",
    });

    const createActivity = async () => {
        invoke("createActivity", activityData.value);
    };
</script>

<template>
    <div>
        <h1 class="title">
            Activities
            <AddButton @click="showModal = true" />
        </h1>
        <Modal v-model:show="showModal" preset="card" title="Add Activity" :segmented="true" class="form-modal">
            <h6>Activity</h6>
            <Input v-model:value="activityData.activity" placeholder="Activity" />
            <h6>Type</h6>
            <Select v-model:value="activityData.type" :options="types" />
            <h6>Class (optional)</h6>
            <Select v-model:value="activityData.class" :options="classes" />
            <template #footer>
                <Button @click="createActivity" type="success" class="form-modal__button">Submit</Button>
            </template>
        </Modal>
    </div>
</template>
