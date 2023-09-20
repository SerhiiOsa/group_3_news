<template>
    <div id="app">
        <RecentNews />
    </div>
</template>

<script>
import RecentNews from './components/RecentNews.vue';


export default {
    name: 'App',
    components: {
        RecentNews
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
