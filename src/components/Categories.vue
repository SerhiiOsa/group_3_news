<template>
    <div id="categories">
        <ul>
            <li v-for="(category, index) of categories" :key="index" @click="onClickCategory">
                {{ category }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CategoriesNews',
    props: {},
    data() {
        return {
            categories: ['Politics', 'Economy', 'Sports', 'Technology', 'Culture and Arts', 'Science and Education']
        }
    },
    computed: {
        
    },
    mounted() {
        
    },
    methods: {
        onClickCategory(event) {
            const value = event.target.innerHTML;
            this.$emit('onClickCategoryNews', value);
        }
    },
};
</script>

<style>
ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

li {
    background-color: rgb(203, 212, 212);
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
}

li:hover {
    transform: scale(1.05);
}
</style>
