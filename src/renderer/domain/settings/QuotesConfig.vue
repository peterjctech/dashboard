<script setup lang="ts">
    import { h, ref, onMounted } from "vue";
    import { QuoteModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Pencil, Trash } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    const quotes: any = ref();
    const quoteData: any = ref({
        quote: "",
    });
    const selectedQuote: any = ref({
        quote_id: "",
        quote: "",
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
        <Button @click="createQuote" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="quotes" :columns="columns" row-class-name="light" flex-height />
    <div class="form">
        <h4>{{ selectedQuote.quote_id ? "Update Quote" : "Select a quote to update" }}</h4>
        <h6>Quote</h6>
        <Input v-model:value="selectedQuote.quote" />
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
