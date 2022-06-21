<script setup lang="ts">
    import { ref, PropType, watch } from "vue";
    import { NoteModel } from "@interfaces";
    import { ArrowForwardCircle, Pencil } from "@vicons/ionicons5";
    import { IconButton } from "@components";

    const props = defineProps({
        note: Object as PropType<NoteModel>,
    });

    const data: any = ref({
        note_id: "",
        title: "",
        note: "",
        updated_at: "",
        timestamp: 0,
    });
    const isEdit = ref(false);

    watch(
        () => props.note,
        () => {
            data.value = props.note;
            isEdit.value = false;
        }
    );

    const edit = () => {
        isEdit.value = true;
        data.value = props.note;
    };
</script>

<template>
    <div v-if="note?.note_id" class="note">
        <div v-if="isEdit" class="note__edit">
            <Input v-model:value="data.title" class="note__input" />
            <Input v-model:value="data.note" type="textarea" class="note__input" />
            <IconButton type="success" class="note__icon">
                <ArrowForwardCircle />
            </IconButton>
        </div>
        <div v-else class="note__view">
            <h1>{{ note?.title }}</h1>
            <p>{{ note?.note }}</p>
            <IconButton @click="edit" type="warning" class="note__icon">
                <Pencil />
            </IconButton>
        </div>
    </div>
</template>

<style lang="scss">
    .note {
        overflow: hidden;
        position: relative;

        &__view {
            h1 {
                color: $neutral-light;
                font-family: $fancy;
                text-align: center;
            }
            p {
                white-space: pre-wrap;
                color: $neutral-light;
            }
        }

        &__edit {
            padding: 2rem;
        }

        &__input {
            margin-bottom: 2rem;
        }

        &__icon {
            position: absolute;
            bottom: 2rem;
            right: 2rem;
        }
    }
</style>
