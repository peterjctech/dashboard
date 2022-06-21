<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { ShortcutModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash, ArchiveOutline } from "@vicons/ionicons5";
    import { invoke } from "@helpers";
    import {
        NUpload as Upload,
        NUploadDragger as UploadDragger,
        UploadCustomRequestOptions,
        UploadInst,
    } from "naive-ui";

    defineProps({
        types: Array as PropType<{ label: string; value: string }[]>,
    });

    const shortcuts: any = ref();
    const shortcutData: any = ref({
        title: "",
        shortcut: "",
        type: "",
        icon: "",
    });
    const selectedShortcut: any = ref({
        shortcut_id: "",
        title: "",
        shortcut: "",
        type: "",
        icon: "",
    });

    onMounted(async () => {
        shortcuts.value = await invoke("getShortcuts");
    });

    const createShortcut = async () => {
        const response = await invoke("createShortcut", shortcutData.value);
        if (response) shortcuts.value.push(response);
    };
    const updateShortcut = async () => {
        const response = await invoke("updateShortcut", selectedShortcut.value);
        if (response) {
            shortcuts.value = shortcuts.value.map((obj: ShortcutModel) => {
                return obj.shortcut_id === response.shortcut_id ? response : obj;
            });
        }
    };

    const columns = [
        {
            title: "Icon",
            key: "icon",
            render(row: ShortcutModel) {
                return h("img", {
                    src: row.icon ? row.icon : "../../assets/images/default-quote.jpg",
                    class: "sized-image",
                });
            },
            width: 120,
        },
        {
            title: "Title",
            key: "title",
        },
        {
            title: "Type",
            key: "type",
        },
        {
            title: "Shortcut",
            key: "shortcut",
        },
        {
            title: "Update",
            key: "update",
            render(row: ShortcutModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            selectedShortcut.value = {
                                shortcut_id: row.shortcut_id,
                                title: row.title,
                                shortcut: row.shortcut,
                                type: row.type,
                                icon: "",
                            };
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
            render(row: ShortcutModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteShortcut", row);
                            shortcuts.value = shortcuts.value.filter(
                                (obj: ShortcutModel) => obj.shortcut_id !== response
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
        <h4>New Shortcut</h4>
        <h6>Title</h6>
        <Input v-model:value="shortcutData.title" />
        <h6>Type</h6>
        <Select v-model:value="shortcutData.type" :options="types" />
        <h6>Shortcut</h6>
        <Input v-model:value="shortcutData.shortcut" />
        <h6>Icon (optional)</h6>
        <Upload
            :max="1"
            :custom-request="({file}: UploadCustomRequestOptions) => (shortcutData.icon = file.file?.path)"
        >
            <UploadDragger>
                <Icon size="48">
                    <ArchiveOutline />
                </Icon>
                <p style="font-size: 16px">Click or drag a file to this area to upload</p>
            </UploadDragger>
        </Upload>
        <Button @click="createShortcut" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="shortcuts" :columns="columns" row-class-name="light" flex-height />
    <div class="form">
        <h4>{{ selectedShortcut.shortcut_id ? "Update Shortcut" : "Select a shortcut to update" }}</h4>
        <h6>Title</h6>
        <Input v-model:value="selectedShortcut.title" />
        <h6>Type</h6>
        <Select v-model:value="selectedShortcut.type" :options="types" />
        <h6>Shortcut</h6>
        <Input v-model:value="selectedShortcut.shortcut" />
        <h6>New Icon</h6>
        <Upload
            :max="1"
            :custom-request="({file}: UploadCustomRequestOptions) => (selectedShortcut.icon = file.file?.path)"
            :disabled="selectedShortcut.shortcut_id ? false : true"
        >
            <UploadDragger>
                <Icon size="48">
                    <ArchiveOutline />
                </Icon>
                <p style="font-size: 16px">Click or drag a file to this area to upload</p>
            </UploadDragger>
        </Upload>
        <Button
            @click="updateShortcut"
            type="success"
            class="form__button"
            :disabled="selectedShortcut.shortcut_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
