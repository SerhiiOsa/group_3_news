<template>
    <div id="search">
        <input @change="onInputsSearchQuery" placeholder="Введіть ключове слово">
        <button @click="getNewsbySearch">Пошук</button>
        <div class="searched-news" v-if="currentNews.articles && currentNews.articles.length > 0">
            <h2>Новини:</h2>
            <div class="navigation">
                <button @click="loadPrevious">Назад</button>
                <button @click="loadMore">Далі</button>
            </div>
            <ul>
                <li v-for="(article, index) in displayedNews" :key="index">
                    <a :href="article.url" target="_blank">
                        <h4 class="title">
                            {{ article.title }}
                        </h4>
                        <img v-if="article.urlToImage" class="img" v-bind:src="article.urlToImage" alt="image">
                        <p class="content">
                            {{ truncateText(article.content, 100) }}
                        </p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="searched-news" v-else>
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

<style>
#search {
    margin-top: 50px;
}

#search input {
    text-align: center;
    width: 300px;
    height: 30px;
    font-size: 20px;
}

#search button {
    margin-left: 20px;
    width: 100px;
    height: 40px;
    background-color: rgb(246, 235, 213);
    border: solid 1px rgb(182, 180, 175);
    border-radius: 5px;
    cursor: pointer;
}

#search button:hover {
    background-color: rgb(198, 181, 147);
    border: solid 1px rgb(80, 70, 53);
}

#search button:active {
    color: rgb(4, 123, 92);
    background-color: rgb(246, 235, 213);
    border: solid 1px rgb(80, 70, 53);
}

#search .searched-news {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.searched-news .navigation {
    margin-top: 20px;
    display: flex;
    align-self: end;
}

#search ul {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

#search li {
    background-color: rgb(226, 237, 234);
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

#search li:hover {
    background-color: rgb(199, 222, 216);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

#search a {
    color: black;
    text-decoration: none;
}

#search h4 {
    font-size: 16px;
}

#search p {
    font-size: 14px;
}

#search .img {
    width: 200px;
}
</style>
