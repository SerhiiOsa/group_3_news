<template>
    <div id="app">
        <Categories @onClickCategoryNews="changeCategory"/>
        <Search :changedCategory="category"/>
    </div>
</template>

<script>
import Categories from './components/Categories.vue';
import Search from './components/Search.vue'


export default {
    name: 'App',
    components: {
        Categories,
        Search

    },
    data() {
        return {
            category: ''
        }
    },
    methods: {
        changeCategory(value) {
            this.category = value;
        }
    }
}
</script>

<style>
body {
    background-color: rgb(246, 235, 213);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
