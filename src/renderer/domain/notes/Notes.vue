<script setup lang="ts">
    import { h, ref, PropType } from "vue";
    import { NoteModel } from "@interfaces";
    import { NModal as Modal, NEllipsis as Ellipsis } from "naive-ui";
    import { IconButton } from "@components";
    import { Trash, Add } from "@vicons/ionicons5";

    defineProps({
        notes: Array as PropType<NoteModel[]>,
    });
    defineEmits(["delete", "select", "create"]);

    const noteData = ref({
        title: "",
        note: "",
    });
    const showModal = ref(false);
</script>

<template>
    <div class="notes">
        <h1 class="notes__title">Notes</h1>
        <IconButton @click="showModal = true" type="success" class="notes__add bordered">
            <Add />
        </IconButton>
        <div class="notes__notes">
            <div v-for="note in notes" class="notes__note">
                <div @click="$emit('select', note)" class="notes__preview">
                    <Ellipsis style="max-width: 400px" class="notes__info">
                        {{ note.title }}
                    </Ellipsis>
                    <p>Last updated: {{ note.updated_at }}</p>
                    <Ellipsis style="max-width: 400px" class="notes__text" :line-clamp="2">
                        {{ note.note }}
                    </Ellipsis>
                </div>
                <IconButton type="error" @click="$emit('delete', note)" class="notes__delete">
                    <Trash />
                </IconButton>
            </div>
        </div>
        <Modal v-model:show="showModal" title="New Note" preset="card" class="form-modal" segmented>
            <h6>Title</h6>
            <Input v-model:value="noteData.title" />
            <h6>Note</h6>
            <Input v-model:value="noteData.note" type="textarea" />
            <template #footer>
                <Button @click="$emit('create', noteData)" class="modal-form__submit">Submit</Button>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss">
    .notes {
        position: relative;

        &__note {
            background-color: lighten($neutral-dark, 7%);
            color: $neutral-light;
            margin: 1rem;
            padding: 1rem;
            border-radius: 10px;
            position: relative;
        }

        &__preview {
            cursor: pointer;
        }

        &__info {
            span {
                font-family: $fancy;
                font-size: 3rem;
            }
        }

        &__add {
            position: absolute;
            top: 2rem;
            right: 2rem;
        }

        &__title {
            font-family: $fancy;
            color: $neutral-light;
            margin-left: 2rem;
            margin-bottom: 0.5rem;
        }

        &__text {
            font-size: 1.5rem;
            white-space: pre-wrap;
        }

        &__delete {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 9;
        }

        p {
            color: $neutral;
            margin-bottom: 1rem;
        }
    }
</style>
