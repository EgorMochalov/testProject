<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="mb-5">Статьи</h1>
            </v-col>
        </v-row>
        <article-form :refresh="refreshArticles"></article-form>
        <v-row class="mt-10">
            <v-col cols="4" v-for="item in artileList"  :key="item.id">
                <v-card :to="'/articles/'+item.id">
                    <v-card-item>
                        <v-card-title>
                            {{ item.title }}
                        </v-card-title>
                        <v-card-text>
                            {{ item.text }}
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios'
import ArticleForm from './ArticleForm.vue'
export default {
    name: 'ArticlePage',
    components:{
        ArticleForm
    },
    data: () => ({
        artileList: '',
    }),
    created() {
        this.refreshArticles()
        //await axios('http://localhost:3002/articles',{
        //    method: "post",
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    data: JSON.stringify({
        //        "title": "adad",
        //        "text": "Sample22323d"
        //    })
        //})
    },
    methods: {
        async refreshArticles() {
            await axios('http://localhost:3002/articles')
                .then(res => {
                    this.artileList = res.data
                })
        },
    }
}
</script>