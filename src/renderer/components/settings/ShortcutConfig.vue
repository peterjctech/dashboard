<script setup lang="ts">
    import { ref } from "vue";
    import { useMisc } from "@store";
    import { format } from "@helpers";
    import { useForm, useDataTable } from "@hooks";
    import { ShortcutProps, Shortcut } from "@types";
    import { Pencil, Trash, ArchiveOutline } from "@vicons/ionicons5";
    import { NUpload, NUploadDragger, UploadCustomRequestOptions } from "naive-ui";
    import { Icon } from "@vicons/utils";

    const miscStore = useMisc();
    const { inputRef, focusInput } = useForm();
    const types = format(["Link", "Application", "Search"]);

    const selectedShortcut = ref<Shortcut>({
        shortcut_id: "",
        title: "",
        shortcut: "",
        type: "",
        icon: "",
    });
    const formData = ref<ShortcutProps>({
        title: "",
        shortcut: "",
        type: "",
        icon: "",
    });

    const customRequest = ({ file }: UploadCustomRequestOptions) => (formData.value.icon = file.file?.path);

    const columns = [
        useDataTable.image({
            title: "Icon",
            imageProp: "icon",
        }),
        { title: "Title", key: "title" },
        { title: "Shortcut", key: "shortcut" },
        { title: "Type", key: "type" },
        useDataTable.icon({
            title: "Edit",
            type: "warning",
            click: (row: Shortcut) => (selectedShortcut.value = JSON.parse(JSON.stringify(row))),
            icon: Pencil,
        }),
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Shortcut) => miscStore.deleteShortcut(row),
            icon: Trash,
        }),
    ];

    const submit = () => {
        miscStore.createShortcut(formData.value);
        formData.value.title = "";
        formData.value.shortcut = "";
        focusInput();
    };
</script>

<template>
    <Form title="New Shortcut" @submit="submit">
        <label>Title</label>
        <Input v-model:value="formData.title" placeholder="Title" ref="inputRef" />
        <label>Shortcut</label>
        <Input v-model:value="formData.shortcut" placeholder="Shortcut" />
        <label>Type</label>
        <Select v-model:value="formData.type" :options="types" filterable placeholder="Type" />
        <label>Icon (Optional)</label>
        <NUpload :max="1" :custom-request="customRequest">
            <NUploadDragger>
                <Icon :size="48">
                    <ArchiveOutline />
                </Icon>
            </NUploadDragger>
        </NUpload>
    </Form>
    <DataTable :data="miscStore.shortcuts" :columns="columns" row-class-name="magenta" flex-height />
    <Form
        v-if="selectedShortcut.shortcut_id"
        :title="`Update shortcut => ${selectedShortcut.type}`"
        @submit="miscStore.updateShortcut(selectedShortcut)"
    >
        <label>Title</label>
        <Input v-model:value="selectedShortcut.title" placeholder="Title" />
        <label>Shortcut</label>
        <Input v-model:value="selectedShortcut.shortcut" placeholder="Shortcut" />
    </Form>
</template>
