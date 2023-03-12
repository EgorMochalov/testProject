<template>
    <v-form>
        <v-col cols="12">
            <v-row>
                <v-text-field cols="12"  class="mr-10" :placeholder="'Title'" :model-value="title"  v-on:change="titleChange"></v-text-field>
                <v-text-field cols="12"  :placeholder="'Text'" :model-value="text" v-on:change="textChange"></v-text-field>
                <v-btn class="mt-5" block v-if="id" v-on:click="saveArticle">Сохранить</v-btn>
                <v-btn type="submit"  block v-if="!id" class="mt-5" v-on:click="addArticle">Добавить</v-btn>
            </v-row>
        </v-col>
    </v-form>
</template>
  
<script>

import axios from 'axios'
export default {
    name: 'ArticleForm',
    props: {
        refresh: {
            type: Function
        },
        id: {
            type: String,
            default: null,
        },
        title: {
            type: String,
        },
        text: {
            type: String
        }
    },
    data: () => ({
        titleNew: "",
        textNew: ""
    }),
    methods: {
        titleChange(e) {
            console.log(e)
            this.titleNew = e.target.value
        },
        textChange(e) {
            this.textNew = e.target.value
        },
        async saveArticle() {

            let localTitle = this.title;
            let localText = this.text;
            if (this.titleNew != "") {
                localTitle = this.titleNew
            }
            if (this.textNew != "") {
                localText = this.textNew
            }

            await axios('http://localhost:3002/articles/' + this.id, {
                method: "patch",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "title": localTitle,
                    "text": localText
                })
            })
                .then(() => {
                    this.refresh()
                })
        }
        ,
        async addArticle() {
            let localTitle = this.title;
            let localText = this.text;
            if (this.titleNew != "") {
                localTitle = this.titleNew
            }
            if (this.textNew != "") {
                localText = this.textNew
            }

            await axios('http://localhost:3002/articles', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "title": localTitle,
                    "text": localText
                })
            })
                .then(() => {
                    this.refresh()
                })
        }
    }
}
</script>