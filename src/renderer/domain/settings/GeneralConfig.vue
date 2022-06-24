<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { invoke, toast } from "@helpers";

    const config = ref();
    const generalData = ref({
        zipCode: 0,
    });

    onMounted(async () => {
        config.value = await invoke("getAllConfig");
    });

    const updateConfig = async () => {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/zip?zip=${generalData.value.zipCode}&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
            }`
        );
        const json = await response.json();
        if (!json.lat) {
            toast.error("Bad zip code");
        } else {
            const meta = {
                zipCode: generalData.value.zipCode,
                latitude: json.lat,
                longitude: json.lon,
            };
            config.value = await invoke("updateConfig", meta);
        }
    };

    const columns = [
        {
            title: "Key",
            key: "key",
        },
        {
            title: "Value",
            key: "value",
        },
    ];
</script>

<template>
    <div class="form">
        <h6>Zip Code</h6>
        <InputNumber v-model:value="generalData.zipCode" />
        <Button @click="updateConfig" type="success" class="form__button">Submit</Button>
    </div>
    <DataTable :data="config" :columns="columns" row-class-name="light" flex-height />
</template>
