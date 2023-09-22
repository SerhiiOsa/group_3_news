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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: rgb(246, 235, 213);
}

#app {
    position: relative;
    margin: 0 auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 20px 80px 20px 80px;
}
</style>
