<template>
  <div class="news-container">
    <h1>Последние новости</h1>

    <div class="category-buttons">
      <button @click="findCategory('business')">Бизнес</button>
      <button @click="findCategory('entertainment')">Развлечения</button>
      <button @click="findCategory('general')">Общее</button>
      <button @click="findCategory('health')">Здоровье</button>
      <button @click="findCategory('science')">Наука</button>
      <button @click="findCategory('sports')">Спорт</button>
      <button @click="findCategory('technology')">Технологии</button>
    </div>

    <div class="search-container">
      <input v-model="searchQuery" placeholder="Поиск новостей" />
      <button @click="findNews">Поиск</button>
    </div>

    <ul class="news-list">
      <li v-for="article in articles" :key="article.title" class="news-item">
        <div class="news-content">
          <h2 class="news-title">{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <a :href="article.url" target="_blank" class="news-link"
            >Читать далее</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.news-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.news-item {
  width: calc((100% - 5 * 20px) / 6);
  background-color: #f0f0f0;
  padding: 10px;

  background-size: cover;
  background-position: center;
  position: relative;

  box-shadow: 10px 10px 11px -5px rgb(121, 121, 121);
}

.news-title {
  background-color: #e2e1e1a6;
  width: 100%;
}

.news-content {
  text-align: center;
}

.news-link {
  background-color: #ffffff;

  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>

<script>
export default {
  data() {
    return {
      articles: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.fetchNews();
    this.findNews();
    this.findCategory();
  },
  methods: {
    fetchNews() {
      var url =
        "https://newsapi.org/v2/everything?" +
        "q=" +
        "from=2023-08-20&" +
        "sortBy=popularity&" +
        "apiKey=fa8b0e4a21a64f658805f5df3fe5e96e";

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.articles = data.articles.slice(0, 10);
        });
    },
    findNews() {
      var apiKey = "fa8b0e4a21a64f658805f5df3fe5e96e";
      var url =
        "https://newsapi.org/v2/everything?" +
        "q=" +
        encodeURIComponent(this.searchQuery) +
        "&" +
        "from=2023-08-20&" +
        "sortBy=popularity&" +
        "apiKey=" +
        apiKey;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.articles && data.articles.length > 0) {
            this.articles = data.articles.slice(0, 10);
          } else {
            this.articles = [];
          }
        });
    },
    findCategory(category = "") {
      var apiKey = "fa8b0e4a21a64f658805f5df3fe5e96e";
      var url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=us&" +
        "category=" +
        category +
        "&" +
        "apiKey=" +
        apiKey;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.articles && data.articles.length > 0) {
            this.articles = data.articles.slice(0, 10);
          } else {
            this.articles = [];
          }
        })
        .catch((error) => {
          console.error("Ошибка при загрузке новостей:", error);
          this.articles = [];
        });
    },
  },
};
</script>
