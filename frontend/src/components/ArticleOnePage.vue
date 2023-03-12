<template>
    <v-container>
        <article-form :refresh="lodaArticle" :title="article.title" :text="article.text" :id="this.id"
            v-if="!flag"></article-form>
        <v-row>
            <v-col cols="12">
                <div v-if="flag">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.text }}</p>
                </div>
                <v-btn class="mt-5 mr-5" v-on:click="() => { if (flag) { flag = false; return }; flag = true }">{{ flag ?
                    'Редактировать' : 'Отмена' }}</v-btn>
                <v-btn class="mt-5" v-if="flag" v-on:click="deleteArticle">Удалить</v-btn>
            </v-col>
        </v-row>
        <comments-page :id="id"></comments-page>
    </v-container>
</template>
  
<script>

import axios from 'axios'
import CommentsPage from './CommentsPage.vue'
import ArticleForm from './ArticleForm.vue'
export default {
    name: 'ArticleOnePage',
    components: {
        CommentsPage,
        ArticleForm
    },
    props: {
        id: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        article: [],
        flag: true
    }),
    created() {
        this.lodaArticle()
    },
    methods: {
        async lodaArticle() {
            await axios("http://localhost:3002/articles/" + this.id).then(res => { this.article = res.data; this.flag = true })
        },
        async deleteArticle() {
            await axios.delete('http://localhost:3002/articles/' + this.id).then(() => {
                this.$router.push({ path: '/' })
            })
        },
    }
}
</script>