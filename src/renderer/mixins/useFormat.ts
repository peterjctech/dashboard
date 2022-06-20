import { computed } from "vue";

export const useFormat = (arr: string[]) => {
    const data = computed(() => {
        const newArray = arr.map((item) => {
            return {
                label: item,
                value: item,
            };
        });

        return newArray;
    });

    return data;
};
