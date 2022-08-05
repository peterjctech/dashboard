<script setup lang="ts">
    import { useGeneral } from "@store";

    const generalStore = useGeneral();
</script>

<template>
    <div class="clock">
        <h2>{{ generalStore.clock.time }}</h2>
        <h3>{{ generalStore.clock.date }}</h3>
        <h5>{{ generalStore.clock.timeLeft }}</h5>
    </div>
</template>

<style lang="scss">
    .clock {
        background-color: $neutral-4;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0.5rem;

        h2,
        h3 {
            color: $primary;
            text-align: center;
        }

        h3 {
            font-family: $writing;
            letter-spacing: 1px;
        }

        h5 {
            position: absolute;
            top: 1rem;
            left: 1rem;
            color: $secondary;
        }
    }
</style>
