<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import dayjs from "dayjs";
    import advancedFormat from "dayjs/plugin/advancedFormat";
    dayjs.extend(advancedFormat);

    const time = ref();
    const date = ref();

    onMounted(() => {
        updateTime();
        setClock;
    });

    const getTime = () => {
        const time = dayjs().format("HH:mm");
        const date = dayjs().format("dddd, Do MMMM, YYYY");
        return { time, date };
    };

    const updateTime = () => {
        const clock = getTime();
        time.value = clock.time;
        date.value = clock.date;
    };

    const setClock = setInterval(() => {
        updateTime;
    }, 60000);
</script>

<template>
    <div class="clock">
        <h2>{{ time }}</h2>
        <h3>{{ date }}</h3>
    </div>
</template>

<style lang="scss">
    .clock {
        h2,
        h3 {
            color: $primary;
            text-align: center;
        }

        h3 {
            font-family: $fancy;
        }
    }
</style>
