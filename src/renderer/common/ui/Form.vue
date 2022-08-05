<script setup lang="ts">
    defineProps({
        title: String,
        disabled: Boolean,
    });
</script>

<template>
    <div class="form">
        <h4 v-if="title" class="form__title">{{ title }}</h4>
        <slot />
        <Button @click="$emit('submit')" type="success" :disabled="disabled || false" class="form__submit">
            Submit
        </Button>
    </div>
</template>

<style lang="scss">
    .form {
        &__title {
            text-align: center;
            color: $neutral-1;
        }

        &__submit {
            margin-top: 3rem;
        }

        section {
            display: flex;

            > * {
                margin-right: 1rem;
                width: 40%;
            }
        }

        label {
            display: block;
            margin: 2rem auto 1rem 0;
        }
    }
</style>
