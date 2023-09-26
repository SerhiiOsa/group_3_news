import Vue from 'vue'
import App from './App.vue'
import { fetchNews } from '../src/services/NewsApi';
import { EventBus } from './services/EventBus';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  async created() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 30);

      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, '0');
      const day = String(yesterday.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      const apiKey = 'aaf88ffaea164442ac7ef3aee108b8b1'; // Replace with your actual API key
      const query = 'a';
      const fromDate = formattedDate;
      const sortBy = 'relevancy';

      const data = await fetchNews(apiKey, query, fromDate, sortBy);
      // Emit an event with the fetched data
      EventBus.$emit('newsDataFetched', data);
    } catch (error) {
      // Handle error
    }
    EventBus.$on('category', (category) => {
      this.fetchCategory(category);
    });
    EventBus.$on('search', (inputValue) => {
      this.fetchSearch(inputValue);
    });
  },
  methods: {
    async fetchCategory(category) {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 30);

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');
        const day = String(yesterday.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const apiKey = 'aaf88ffaea164442ac7ef3aee108b8b1'; // Replace with your actual API key
        const query = category;
        const fromDate = formattedDate;
        const sortBy = 'relevancy';
        const data = await fetchNews(apiKey, query, fromDate, sortBy);
        EventBus.$emit('newsDataFetched', data);
      } catch (error) {
        // Hadle error
      }
    },
    async fetchSearch(inputValue) {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 30);

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');
        const day = String(yesterday.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const apiKey = 'aaf88ffaea164442ac7ef3aee108b8b1'; // Replace with your actual API key
        const query = inputValue;
        const fromDate = formattedDate;
        const sortBy = 'relevancy';
        const data = await fetchNews(apiKey, query, fromDate, sortBy);
        EventBus.$emit('newsDataFetched', data);
      } catch (error) {
        // Hadle error
      }
    }
  }
}).$mount('#app')
