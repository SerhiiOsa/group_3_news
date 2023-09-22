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
#categories ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 10px;
}

#categories li {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
}

#categories li:hover {
    color: rgb(4, 123, 92);
}
</style>
