<script setup lang="ts">
    import { h, PropType, ref, onMounted } from "vue";
    import { QuoteModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash, ArchiveOutline } from "@vicons/ionicons5";
    import { invoke } from "@helpers";
    import {
        NUpload as Upload,
        NUploadDragger as UploadDragger,
        UploadCustomRequestOptions,
        UploadInst,
    } from "naive-ui";

    const quotes: any = ref();
    const quoteData: any = ref({
        quote: "",
        image: "",
    });
    const selectedQuote: any = ref({
        quote_id: "",
        quote: "",
        image: "",
    });

    onMounted(async () => {
        quotes.value = await invoke("getQuotes");
        console.log(quotes.value);
    });

    const createQuote = async () => {
        const response = await invoke("createQuote", quoteData.value);
        if (response) quotes.value.push(response);
    };
    const updateQuote = async () => {
        const response = await invoke("updateQuote", selectedQuote.value);
        if (response) {
            quotes.value = quotes.value.map((obj: QuoteModel) => {
                return obj.quote_id === response.quote_id ? response : obj;
            });
        }
    };

    const columns = [
        {
            title: "Image",
            key: "image",
            render(row: QuoteModel) {
                return h("img", {
                    src: row.image ? row.image : "../../assets/images/default-quote.jpg",
                    class: "sized-image",
                });
            },
            width: 120,
        },
        {
            title: "Quote",
            key: "quote",
        },
        {
            title: "Update",
            key: "update",
            render(row: QuoteModel) {
                return h(
                    IconButton,
                    {
                        onClick: () => {
                            selectedQuote.value = {
                                quote_id: row.quote_id,
                                quote: row.quote,
                                image: "",
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
            render(row: QuoteModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteQuote", row);
                            quotes.value = quotes.value.filter((obj: QuoteModel) => obj.quote_id !== response);
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
        <h4>New Quote</h4>
        <h6>Quote</h6>
        <Input v-model:value="quoteData.quote" />
        <h6>Image (optional)</h6>
        <Upload :max="1" :custom-request="({file}: UploadCustomRequestOptions) => (quoteData.image = file.file?.path)">
            <UploadDragger>
                <Icon size="48">
                    <ArchiveOutline />
                </Icon>
                <p style="font-size: 16px">Click or drag a file to this area to upload</p>
            </UploadDragger>
        </Upload>
        <Button @click="createQuote" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="quotes" :columns="columns" row-class-name="light" flex-height />
    <div class="form">
        <h4>{{ selectedQuote.quote_id ? "Update Quote" : "Select a quote to update" }}</h4>
        <h6>Quote</h6>
        <Input v-model:value="selectedQuote.quote" />
        <h6>New Image</h6>
        <Upload
            :max="1"
            :custom-request="({file}: UploadCustomRequestOptions) => (selectedQuote.image = file.file?.path)"
            :disabled="selectedQuote.quote_id ? false : true"
        >
            <UploadDragger>
                <Icon size="48">
                    <ArchiveOutline />
                </Icon>
                <p style="font-size: 16px">Click or drag a file to this area to upload</p>
            </UploadDragger>
        </Upload>
        <Button
            @click="updateQuote"
            type="success"
            class="form__button"
            :disabled="selectedQuote.quote_id ? false : true"
        >
            Submit
        </Button>
    </div>
</template>
