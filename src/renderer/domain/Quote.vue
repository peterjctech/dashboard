<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { invoke } from "@helpers";

    const quotes = ref([]);
    const quote = ref({
        quote_id: "",
        quote: "",
    });

    onMounted(async () => {
        const response = await invoke("getQuotes");
        quotes.value = response;
        const random = Math.floor(Math.random() * quotes.value.length);
        quote.value = quotes.value[random];
    });
</script>

<template>
    <div class="quote">
        <img src="~@assets/images/default-quote.jpg" alt="" />
        <h6>{{ quote.quote }}</h6>
    </div>
</template>

<style lang="scss">
    .quote {
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }
        h6 {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
            color: white;
            text-align: center;
        }
    }
</style>
