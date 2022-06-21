<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { EventCategoryModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    defineProps({
        classes: Array as PropType<{ label: string; value: string }[]>,
    });

    const eventCategories: any = ref();
    const eventCategoryData = ref({
        category: "",
        class: "",
    });
    const selectedCategory = ref({
        category_id: "",
        category: "",
        class: "",
    });

    onMounted(async () => {
        eventCategories.value = await invoke("getEventCategories");
    });

    const createEventCategory = async () => {
        eventCategories.value.push(await invoke("createEventCategory", eventCategoryData.value));
    };
    const updateEventCategory = async () => {
        const response = await invoke("updateEventCategory", selectedCategory.value);
        if (response) {
            eventCategories.value = eventCategories.value.map((obj: EventCategoryModel) => {
                return obj.category_id === response.category_id ? response : obj;
            });
        }
    };

    const columns = [
        {
            title: "Category",
            key: "category",
        },
        {
            title: "Update",
            key: "update",
            render(row: EventCategoryModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            selectedCategory.value = row;
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
            render(row: EventCategoryModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteEventCategory", row);
                            eventCategories.value = eventCategories.value.filter(
                                (obj: EventCategoryModel) => obj.category_id !== response
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
        <h4>New Category</h4>
        <h6>Category</h6>
        <Input v-model:value="eventCategoryData.category" />
        <h6>Class (optional)</h6>
        <Select v-model:value="eventCategoryData.class" :options="classes" />
        <Button @click="createEventCategory" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable
        :data="eventCategories"
        :columns="columns"
        :row-class-name="(row: EventCategoryModel) => row.class"
        flex-height
    />
    <div class="form">
        <h4>{{ selectedCategory.category_id ? "Update Category" : "Select an category to update" }}</h4>
        <h6>Category</h6>
        <Input v-model:value="selectedCategory.category" />
        <h6>Class</h6>
        <Select v-model:value="selectedCategory.class" :options="classes" />
        <Button
            @click="updateEventCategory"
            type="success"
            class="form__button"
            :disabled="selectedCategory.category_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
