<template>
    <div id="search">
        <input @change="onInputsSearchQuery" placeholder="Введіть ключове слово">
        <button @click="getNewsbySearch">Пошук</button>
        <button @click="loadPrevious">Назад</button>
        <button @click="loadMore">Далі</button>
        <div class="searched-news" v-if="currentNews.articles && currentNews.articles.length > 0">
            <h2>Новини:</h2>
            <ul>
                <li v-for="(article, index) in displayedNews" :key="index">
                    <a :href="article.url" target="_blank">
                        {{ article.title }}
                        <img class="img" v-bind:src="article.urlToImage" alt="image">
                        {{ truncateText(article.content, 100) }}
                    </a>
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
    props: {
        changedCategory: {
            type: String
        }
    },
    data() {
        return {
            currentNews: '',
            searchQuery: 'all',
            lastDays: 1,
            page: 1,
            pageSize: 10,
            articlContent: ''
        };
    },
    computed: {
        displayedNews() {
            const start = (this.page - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.currentNews.articles.slice(start, end);
        },
    },
    mounted() {
        this.getNewsbySearch();
    },
    methods: {
        onInputsSearchQuery() {
            this.searchQuery = document.querySelector('input').value;
        },
        getNewsbySearch() {
            this.page = 1;
            this.fetchNews();
        },
        fetchNews() {
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
            if (this.page >= 1) this.page--;
        },
        loadMore() {
            if (this.page * this.pageSize < this.currentNews.articles.length) this.page++;
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
        }
    },
    watch: {
        changedCategory() {
            this.searchQuery = this.changedCategory;
            this.getNewsbySearch();
        }
    }
};
</script>

<style scoped>
input {
    width: 300px;
    height: 30px;
    font-size: 20px;
}

button {
    margin-left: 20px;
    width: 80px;
    height: 33px;
}

.searched-news {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

li {
    background-color: rgb(226, 237, 234);
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
    ;
}

li:hover {
    transform: scale(1.05);
}

a {
    color: black;
    text-decoration: none;
}

.img {
    width: 200px;
    height: 200px;
}
</style>
