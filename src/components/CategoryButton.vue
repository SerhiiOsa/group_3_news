<template>
    <div @click="categoryChange(category)"  class="category-button">
        <p>{{ category }}</p>
    </div>
</template>

<script>
    import { EventBus } from '../services/EventBus';

    export default {
    name: 'CategoryButton',
    props: {
        category: String
    },
    methods: {
        categoryChange(category) {
            EventBus.$emit('category', category);
        }
    }
}
</script>

<style>
.category-button {
    width: unset;
    height: 35px;
    margin-right: 16px;
    padding-right: 8px;
    padding-left: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.category-button:hover {
    text-decoration: underline;
}

.category-button p {
    margin: 0;
}
</style>