<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { TicketCategoryModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    defineProps({
        classes: Array as PropType<{ label: string; value: string }[]>,
    });

    const ticketCategories: any = ref();
    const ticketCategoryData = ref({
        category: "",
        class: "",
    });
    const selectedCategory = ref({
        category_id: "",
        category: "",
        class: "",
    });

    onMounted(async () => {
        ticketCategories.value = await invoke("getTicketCategories");
    });

    const createTicketCategory = async () => {
        const response = await invoke("createTicketCategory", ticketCategoryData.value);
        if (response) ticketCategories.value.push(response);
    };
    const updateTicketCategory = async () => {
        const response = await invoke("updateTicketCategory", selectedCategory.value);
        if (response) {
            ticketCategories.value = ticketCategories.value.map((obj: TicketCategoryModel) => {
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
            render(row: TicketCategoryModel) {
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
            render(row: TicketCategoryModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteTicketCategory", row);
                            ticketCategories.value = ticketCategories.value.filter(
                                (obj: TicketCategoryModel) => obj.category_id !== response
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
        <Input v-model:value="ticketCategoryData.category" />
        <h6>Class (optional)</h6>
        <Select v-model:value="ticketCategoryData.class" :options="classes" />
        <Button @click="createTicketCategory" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable
        :data="ticketCategories"
        :columns="columns"
        :row-class-name="(row: TicketCategoryModel) => row.class"
        flex-height
    />
    <div class="form">
        <h4>{{ selectedCategory.category_id ? "Update Category" : "Select an category to update" }}</h4>
        <h6>Category</h6>
        <Input v-model:value="selectedCategory.category" />
        <h6>Class</h6>
        <Select v-model:value="selectedCategory.class" :options="classes" />
        <Button
            @click="updateTicketCategory"
            type="success"
            class="form__button"
            :disabled="selectedCategory.category_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
