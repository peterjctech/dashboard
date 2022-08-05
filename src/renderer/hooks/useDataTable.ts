import { Component, h } from "vue";
import { Icon } from "@common";

interface IconProps {
    title: string;
    type: string;
    click: Function;
    icon: Component;
    width?: number;
}

const useDataTable = {
    icon: (props: IconProps) => {
        return {
            title: props.title,
            key: props.title.toLowerCase(),
            render(row: any) {
                return h(Icon, { onClick: () => props.click(row), type: props.type }, () => h(props.icon));
            },
            width: props.width || 80,
        };
    },
};

export default useDataTable;
