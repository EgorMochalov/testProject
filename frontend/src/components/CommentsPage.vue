<template>
    <v-row>
        <v-col cols="12">
            <h1>Комментарии</h1>
            <div class="d-flex justify-space-between">
                <h2 class="align-self-center">Фильтрация:</h2>
                <div class="d-flex mt-5">
                    <div class="d-flex mr-5">
                        <h3 class="mr-5 mt-5">От</h3>
                        <v-text-field v-model="dateFrom" v-on:change="testDataF"  type="datetime-local"></v-text-field>
                    </div>
                    <div class="d-flex">
                        <h3 class="mr-5 mt-5">До</h3>
                        <v-text-field v-model="dateTo" v-on:change="testDataF" type="datetime-local"></v-text-field>
                    </div>
                    <v-btn v-on:click="testDataF">erer</v-btn>
                </div>
            </div>
            <v-card v-if="commentsList.length != 0">
                <v-list lines="two">
                    <v-list-item class="" v-for="item in commentsList" :key="item.id">
                        <comments-one :item="item" :id="id" :refresh="refreshComments"></comments-one>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-form block class="mt-20">
                <v-text-field v-model="text" placeholder="Text comment"> </v-text-field>
                <v-btn v-on:click="addComment">Добавить</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>
  
<script>
import axios from 'axios'
import CommentsOne from './CommentsOne.vue'
export default {
    props: {
        id: {
            type: String,
            default: null,
        },
    },
    name: 'CommentsPage',
    components: {
        CommentsOne
    },
    data: () => ({
        commentsList: [],
        text: '',
        flag: true,
        dateFrom:null,
        dateTo:null,    }),
    async created() {
        this.refreshComments()
    },
    methods: {
        async refreshComments() {
            await axios('http://localhost:3002/articles/' + this.id + '/comments')
                .then(res => {
                    this.commentsList = res.data
                })
        },
        async addComment() {
            await axios('http://localhost:3002/articles/' + this.id + '/comments', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "articleId": this.id,
                    "text": this.text
                })
            }).then(() => {
                this.refreshComments()
            })
        },
        async deleteComment(idComment) {
            await axios.delete('http://localhost:3002/articles/' + this.id + '/comments/' + idComment).then(() => {
                this.refreshComments()
            })
        },
        async editComment(idComment) {
            await axios('http://localhost:3002/articles/' + this.id + '/comments/' + idComment, {
                method: "patch",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "text": this.text
                })
            })
                .then(() => {
                    this.refreshComments()
                })
        },
        async testDataF(){
            await axios.get('http://localhost:3002/analytic/comments/?dateFrom='+this.dateFrom+'&dateTo='+this.dateTo).then(res=>this.commentsList=res.data)
        }
    }
}
</script>