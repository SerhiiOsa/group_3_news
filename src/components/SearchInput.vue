<template>
    <div>
        <label for="userInput">&#128269;</label>
        <input placeholder="Search" @keydown.enter="searchEnter(inputValue)" v-model="inputValue" type="text" id="userInput" name="userInput">
    </div>
</template>

<script>
    import { EventBus } from '../services/EventBus';

    export default {
    name: 'SearchInput',
    props: {

    },
    data() {
        return {
            inputValue: ''
        };
    },
    methods: {
        searchEnter(inputValue) {
            EventBus.$emit('search', inputValue);
            this.inputValue = '';
        }
    }
}
</script>

<style>
</style>