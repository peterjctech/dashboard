<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { invoke } from "@helpers";
    import dayjs from "dayjs";

    interface WeatherData {
        cityName: string;
        temperature: number;
        sunrise: string;
        sunset: string;
        description: string;
        icon: string;
    }

    const weatherData = ref<WeatherData>({
        cityName: "",
        temperature: 0,
        sunrise: "",
        sunset: "",
        description: "",
        icon: "",
    });

    onMounted(async () => {
        const latitude = await invoke("getConfig", "latitude");
        const longitude = await invoke("getConfig", "longitude");
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
            }`
        );
        const currentJSON = await response.json();
        weatherData.value = {
            cityName: currentJSON.name,
            temperature: Math.round(currentJSON.main.temp),
            sunrise: dayjs.unix(currentJSON.sys.sunrise).format("HH:mm"),
            sunset: dayjs.unix(currentJSON.sys.sunset).format("HH:mm"),
            description: currentJSON.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${currentJSON.weather[0].icon}@2x.png`,
        };
    });
</script>

<template>
    <div class="weather">
        <div class="weather__main">
            <section class="weather__header">
                <img :src="weatherData.icon" />
                <h1 class="weather__city">{{ weatherData.cityName }}</h1>
                <h3 class="weather__temp">{{ weatherData.temperature }}&#176;F</h3>
            </section>
            <p class="weather__description">{{ weatherData.description }}</p>
            <section class="weather__sun">
                <h6>Sunrise: {{ weatherData.sunrise }}</h6>
                <h6>Sunset: {{ weatherData.sunset }}</h6>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
    .weather {
        border: solid $secondary 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 10px;

        &__header {
            display: flex;
            justify-content: center;

            > * {
                font-family: $fancy;
                margin: 1rem;
                color: white;
            }

            img {
                width: 6rem;
                height: 6rem;
            }
        }

        &__description {
            color: $neutral-light;
            font-size: 1.5rem;
            text-align: center;
        }

        &__sun {
            display: flex;
            justify-content: center;

            > :nth-child(1) {
                color: $primary;
                margin: 2rem;
            }
            > :nth-child(2) {
                color: $secondary;
                margin: 2rem;
            }
        }

        .n-card-content {
            width: 60rem;
        }

        &__modal {
            width: 100rem;
        }

        &__date {
            color: $secondary;
            text-align: center;
        }

        &__modal-content {
            display: flex;
            justify-content: space-around;

            > section {
                border: solid $primary 3px;
                width: 25rem;
                padding: 2rem;
            }
        }
    }
</style>
