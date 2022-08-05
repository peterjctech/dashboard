export const format = (arr: string[]) => {
    const data = [];
    for (let i = 0; i < arr.length; i++) {
        data.push({ label: arr[i], value: arr[i] });
    }
    return data;
};
