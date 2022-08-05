import { Component, h } from "vue";
import { Icon } from "@common";

interface IconProps {
    title: string;
    type: string;
    click: Function;
    icon: Component;
    width?: number;
}

interface ConditionalIconProps {
    title: string;
    types: [string, string];
    click: Function;
    icons: [Component, Component];
    condition: string;
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
    conditionalIcon: (props: ConditionalIconProps) => {
        return {
            title: props.title,
            key: props.title.toLowerCase(),
            render(row: any) {
                return h(
                    Icon,
                    { onClick: () => props.click(row), type: row[props.condition] ? props.types[0] : props.types[1] },
                    () => h(row[props.condition] ? props.icons[0] : props.icons[1])
                );
            },
            width: 80,
        };
    },
};

export default useDataTable;
