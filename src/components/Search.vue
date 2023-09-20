<template>
  <div id="search">
    <input @change="onInputsSearchQuery" v-model="searchQuery" placeholder="Введіть ключове слово">
    <button @click="getNewsbySearch">Пошук</button>
    <button @click="loadPrevious">Назад</button>
    <button @click="loadMore">Далі</button>
    <div class="searched-news" v-if="currentNews.articles && currentNews.articles.length > 0">
      <h2>Новини за пошуком:</h2>
      <ul>
        <li v-for="(article, index) in displayedNews" :key="index">
          {{ article.title }}
          <img class="img" v-bind:src="article.urlToImage" alt="image">
          {{ article.content }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Новини не отримані або відсутні.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchNews',
  props: {},
  data() {
    return {
      currentNews: '',
      searchQuery: 'all',
      lastDays: 1,
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    displayedNews() {
      // Вираховуємо, які новини відображати на поточній сторінці
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.currentNews.articles.slice(start, end);
    },
  },
  methods: {
    onInputsSearchQuery() {
      this.searchQuery = document.querySelector('input').value;
    },
    getNewsbySearch() {
      // Виконати пошук на основі значення searchQuery
      // Результати зберегти в this.currentNews
      // Скинути сторінку до першої при новому пошуку
      this.page = 1;
      this.fetchNews();
    },
    fetchNews() {
      // Обчислюємо вчорашню дату
      const today = new Date();
      today.setDate(today.getDate() - this.lastDays);
      const formattedDate = today.toISOString().split('T')[0];

      let url =
        'https://newsapi.org/v2/everything?' +
        `q=${this.searchQuery}&` +
        `from=${formattedDate}&` +
        'sortBy=publishedAt&' +
        'apiKey=53da602ff71446f19465d5369223f3d4';

      let req = new Request(url);

      fetch(req)
        .then((response) => response.json())
        .then((data) => {
          this.currentNews = data;
          console.log(this.currentNews);
        })
        .catch((error) => {
          console.error('Виникла помилка:', error);
        });
    },
    loadPrevious() {
      if(this.page >= 1) this.page--;
    },
    loadMore() {
      if(this.page * this.pageSize >= this.currentNews.articles.length) this.page++;
    },
  },
};
</script>

<style>
.searched-news {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

li {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
}

.img {
  width: 200px;
  height: 200px;
}
</style>
