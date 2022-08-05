<script setup lang="ts">
    import { ShoppingList, ShoppingForm, HabitForm, NoteForm, Notes } from "@components";
    import { Habits } from "@common";
    import { useNotebook } from "@store";

    const notebookStore = useNotebook();
</script>

<template>
    <main class="notebook-page">
        <Habits :habits="notebookStore.habits" style="grid-area: 1 / 1 / 3 / 3" />
        <ShoppingList style="grid-area: 1 / 4 / 2 / 5" />
        <Notes style="grid-area: 1 / 3 / 3 / 4" />
        <Card style="grid-area: 2 / 4 / 3 / 5">
            <Tabs animated>
                <TabPane name="Notes">
                    <NoteForm />
                </TabPane>
                <TabPane name="Habits">
                    <HabitForm />
                </TabPane>
                <TabPane name="Shopping">
                    <ShoppingForm />
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>

<style lang="scss">
    .notebook-page {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
</style>
