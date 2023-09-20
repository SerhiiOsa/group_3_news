<template>
    <div id="search">
        <input @change="onInputsSearchQuery" v-model="searchQuery" placeholder="Введіть ключове слово">
        <button @click="getNewsbySearch">Пошук</button>
        <div class="searched-news" v-if="currentNews.articles && currentNews.articles.length > 0">
            <h2>Новини за пошуком:</h2>
            <ul>
                <li v-for="(article, index) in currentNews.articles.slice(0, 10)" :key="index">
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
            lastDays: 1
        };
    },
    methods: {
        onInputsSearchQuery() {
            this.searchQuery = document.querySelector('input').value;
        },
        getNewsbySearch() {
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
        }
    },
}
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