<script setup lang="ts">
    import { useMisc } from "@store";

    const miscStore = useMisc();
    const quote = miscStore.quotes[(miscStore.quotes.length * Math.random()) | 0];
</script>

<template>
    <div class="quote">
        <img src="~@assets/images/sky.jpg" />
        <h5 v-if="quote">{{ quote.quote }}</h5>
    </div>
</template>

<style lang="scss">
    .quote {
        position: relative;

        img {
            border-radius: 1rem;
            width: 100%;
            height: 100%;
        }

        h5 {
            position: absolute;
            bottom: 50%;
            right: 50%;
            transform: translate(50%, 50%);
            color: $neutral-1;
            text-align: center;
            letter-spacing: 1px;
            font-family: $writing;
        }
    }
</style>
