<script setup lang="ts">
    import { useGeneral } from "@store";

    const generalStore = useGeneral();
</script>

<template>
    <div class="weather">
        <section class="weather__header">
            <img :src="generalStore.weather.icon" />
            <h1 class="weather__city">{{ generalStore.weather.cityName }}</h1>
            <h3 class="weather__temp">{{ generalStore.weather.temperature }}&#176;F</h3>
        </section>
        <p class="weather__description">{{ generalStore.weather.description }}</p>
        <section class="weather__sun">
            <h6 class="weather__sunrise">Sunrise: {{ generalStore.weather.sunrise }}</h6>
            <h6 class="weather__sunset">Sunset: {{ generalStore.weather.sunset }}</h6>
        </section>
        <h6 class="weather__last-updated">Last Updated: {{ generalStore.weather.last_updated }}</h6>
        <Button @click="generalStore.getWeather()" type="success">Get New Data</Button>
    </div>
</template>

<style lang="scss">
    .weather {
        border: solid $secondary 3px;
        border-radius: 10px;
        display: grid;
        place-items: center;

        &__header {
            display: flex;

            > * {
                font-family: $fancy;
                margin: 1rem;
                color: $neutral-1;
            }

            img {
                width: 6rem;
                height: 6rem;
            }
        }

        &__description {
            color: $neutral-1;
            font-size: 1.5rem;
        }

        &__sun {
            display: flex;
        }

        &__sunrise {
            margin: 2rem;
            color: $primary;
        }
        &__sunset {
            margin: 2rem;
            color: $secondary;
        }

        &__last-updated {
            color: $neutral-1;
        }
    }
</style>
