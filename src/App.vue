<template>
  <div id="app">
    <div id="header">
      <h1>News</h1>
      <div id="categories">
      <CategoryButton :category="Category1"></CategoryButton>
      <CategoryButton :category="Category2"></CategoryButton>
      <CategoryButton :category="Category3"></CategoryButton>
      <CategoryButton :category="Category4"></CategoryButton>
      <CategoryButton :category="Category5"></CategoryButton>
      </div>
      <SearchInput></SearchInput>
    </div>
    <NewsPagination :page="page"></NewsPagination>
    <div id="content">
      <div v-for="instanceData in instancesData" :key="instanceData.id">
        <!-- Instantiate MyComponent with dynamic props -->
        <NewsCard :content="instanceData.content" />
      </div>
    </div>
    <NewsPagination :page="page"></NewsPagination>
  </div>
</template>

<script>
import NewsCard from './components/NewsCard.vue'
import SearchInput from './components/SearchInput.vue'
import CategoryButton from './components/CategoryButton.vue'
import NewsPagination from './components/NewsPagination.vue'
import { EventBus } from './services/EventBus'

export default {
  name: 'App',
  components: {
    SearchInput,
    CategoryButton,
    NewsCard,
    NewsPagination,
  },
  data() {
    return {
      instancesData: [],
      page: 0,
      Category1: 'Politics',
      Category2: 'Business',
      Category3: 'Technology',
      Category4: 'Entertainment',
      Category5: 'Health',
    };
  },
  created() {
    // Generate instancesData with incrementing content values
    for (let i = 0; i < 10; i++) {
      this.instancesData.push({ id: i, content: (i + this.page) });
    }
    EventBus.$on('prevPage', () => {
      if (this.page >= 10) {
        this.page -= 10;
        this.instancesData = [];
        for (let i = 0; i < 10; i++) {
          this.instancesData.push({ id: i, content: (i + this.page) });
        }
      }
    });
    EventBus.$on('nextPage', () => {
      if (this.page <= 80) {
        this.page += 10;
        this.instancesData = [];
        for (let i = 0; i < 10; i++) {
          this.instancesData.push({ id: i, content: (i + this.page) });
        }
      }
    });
    EventBus.$on('setPage', (nPage) => {
      this.page = nPage * 10;
      this.instancesData = [];
      for (let i = 0; i < 10; i++) {
        this.instancesData.push({ id: i, content: (i + this.page) });
      }
    });
  }
}
</script>

<style>
body {
  background-color: rgb(27, 27, 27);
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 0px;
}

#categories {
  display: flex;
  margin: 8px;
}

#header {
  height: 40px;
  display: flex;
  background-color: rgb(140, 84, 161);
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  color: white;
}

#content {
  margin: 8px;
  margin-left: 32px;
  margin-right: 32px;
}
</style>
