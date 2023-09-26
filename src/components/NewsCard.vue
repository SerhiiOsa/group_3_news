<template>
  <div class="news-card" v-if="newsData">
    <a :href="newsData.articles[content].url" target="_blank">
      <img :src="newsData.articles[content].urlToImage" :alt="content">
    </a>
    <a class="title-desc" :href="newsData.articles[content].url" target="_blank">
      <p>{{ newsData.articles[content].title }}</p>
      <p>{{ newsData.articles[content].description }}</p>
    </a>
  </div>
</template>

<script>
import { EventBus } from '../services/EventBus';

export default {
  name: 'NewsCard',
  props: {
    content: Number
  },
  data() {
    return {
      newsData: null,
    };
  },
  created() {
    // Listen for the 'newsDataFetched' event and update newsData when it's emitted
    EventBus.$on('newsDataFetched', (data) => {
      this.newsData = data;
    });
  },
};
</script>

<style>
img {
  width: unset;
  height: 150px;
}

.news-card {
  margin: 0 auto;
  margin-bottom: 10px;
  box-shadow: 0 0 10px -3px black;
  display: flex;
  flex-direction: row;
  background-color: rgb(38, 38, 38);
  max-width: 1440px;
}

.title-desc {
  text-decoration: none;
  text-align: left;
  color: rgb(214, 214, 214);
  margin-left: 32px;
  margin-right: 32px;
  font-weight: normal;
}

.title-desc:hover {
  text-decoration: initial;
  text-decoration-line: underline;
}

p:nth-child(1) {
  font-weight: bold;
  margin-bottom: 16px;
}
</style>