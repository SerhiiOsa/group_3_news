<template>
    <div class="navigation">
        <div id="pages">
            <p v-if="page === 0" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">1</p>
            <p @click="setPage(nPage1)" v-if="page !== 0" :style="{color: 'rgb(202, 202, 202)'}">1</p>
            <p v-if="page === 10" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">2</p>
            <p @click="setPage(nPage2)" v-if="page !== 10" :style="{color: 'rgb(202, 202, 202)'}">2</p>
            <p v-if="page === 20" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">3</p>
            <p @click="setPage(nPage3)" v-if="page !== 20" :style="{color: 'rgb(202, 202, 202)'}">3</p>
            <p v-if="page === 30" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">4</p>
            <p @click="setPage(nPage4)" v-if="page !== 30" :style="{color: 'rgb(202, 202, 202)'}">4</p>
            <p v-if="page === 40" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">5</p>
            <p @click="setPage(nPage5)" v-if="page !== 40" :style="{color: 'rgb(202, 202, 202)'}">5</p>
            <p v-if="page === 50" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">6</p>
            <p @click="setPage(nPage6)" v-if="page !== 50" :style="{color: 'rgb(202, 202, 202)'}">6</p>
            <p v-if="page === 60" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">7</p>
            <p @click="setPage(nPage7)" v-if="page !== 60" :style="{color: 'rgb(202, 202, 202)'}">7</p>
            <p v-if="page === 70" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">8</p>
            <p @click="setPage(nPage8)" v-if="page !== 70" :style="{color: 'rgb(202, 202, 202)'}">8</p>
            <p v-if="page === 80" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">9</p>
            <p @click="setPage(nPage9)" v-if="page !== 80" :style="{color: 'rgb(202, 202, 202)'}">9</p>
            <p v-if="page === 90" :style="{color: 'white', textDecoration: 'underline', fontWeight: 'bold'}">10</p>
            <p @click="setPage(nPage10)" v-if="page !== 90" :style="{color: 'rgb(202, 202, 202)'}">10</p>
        </div>
        <div @click="prevPage" class="prev">&#706;</div>
        <div @click="nextPage" class="next">&#707;</div>
    </div>
</template>

<script>
    import { EventBus } from '../services/EventBus';

    export default {
    name: 'NewsPagination',
    props: {
        page: Number
    },
    data() {
        return {
            nPage1: 0,
            nPage2: 1,
            nPage3: 2,
            nPage4: 3,
            nPage5: 4,
            nPage6: 5,
            nPage7: 6,
            nPage8: 7,
            nPage9: 8,
            nPage10: 9
        }
    },
    methods: {
        prevPage() {
            EventBus.$emit('prevPage');
        },
        nextPage() {
            EventBus.$emit('nextPage');
        },
        setPage(nPage) {
            EventBus.$emit('setPage', nPage);
        }
    }
}
</script>

<style>
.navigation {
    display: flex;
    justify-content: end;
    margin-right: 32px;
}

.navigation {
    display: flex;
    justify-content: end;
    margin: 16px;
    margin-right: 32px;
    user-select: none;
}

#pages {
    display: flex;
    width: 250px;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
}

.prev {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    box-shadow: 0 0 10px -3px black;
    cursor: pointer;
    background-color: rgb(140, 84, 161);
}

.next {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px -3px black;
    cursor: pointer;
    background-color: rgb(140, 84, 161);
}

.next:hover,.prev:hover {
    background-color: rgb(163, 90, 190);
}

.next:active,.prev:active {
    background-color: rgb(39, 38, 38);
}

.navigation p {
    margin: 0;
    color: rgb(202, 202, 202);
    font-weight: 400;
    cursor: pointer;
}
.navigation p:hover {
    text-decoration: underline;
    color: white;
}
</style>