<script setup lang="ts">
    import { h, ref, PropType } from "vue";
    import { NoteModel } from "@interfaces";
    import { NModal as Modal, NEllipsis as Ellipsis } from "naive-ui";
    import { IconButton } from "@components";
    import { Pencil, Trash, Add } from "@vicons/ionicons5";

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
    <div class="notes-view">
        <h1 class="notes-view__title">Notes</h1>
        <IconButton @click="showModal = true" type="success" class="notes-view__add bordered">
            <Add />
        </IconButton>
        <div class="notes-view__notes">
            <div v-for="note in notes" class="notes-view__note">
                <Ellipsis style="max-width: 400px" class="notes-view__info">
                    {{ note.title }} ({{ note.updated_at }})
                </Ellipsis>
                <section>
                    <IconButton type="warning" @click="$emit('select', note)">
                        <Pencil />
                    </IconButton>
                    <IconButton type="error" @click="$emit('delete', note)">
                        <Trash />
                    </IconButton>
                </section>
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
    .notes-view {
        position: relative;

        &__note {
            background-color: lighten($neutral-dark, 7%);
            color: $neutral-light;
            margin: 1rem;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            border-radius: 10px;

            section {
                display: flex;

                > * {
                    margin: 0.3rem;
                }
            }
        }

        &__info {
            align-self: center;

            span {
                font-family: $fancy;
                font-size: 2rem;
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
        }
    }
</style>
