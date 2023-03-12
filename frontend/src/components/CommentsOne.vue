<template>
    <div class="d-flex justify-space-between pa-6 bg-grey">
        <h2 v-if="flag">{{ item.text }}</h2>
        <v-text-field :model-value="item.text" v-on:change="textChange" v-if="!flag"></v-text-field>
        <div>
            <v-btn class="mr-4"
                v-on:click="() => { if (flag) { flag = false; this.text = item.text; return }; flag = true }">{{ flag ?
                    'Редактировать' : 'Отмена' }}</v-btn>
            <v-btn v-if="flag" v-on:click="deleteComment">Удалить</v-btn>
            <v-btn v-if="!flag" v-on:click="editComment">Сохранить</v-btn>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    props: {
        id: {
            type: String,
            default: null,
        },
        item:{
            type:Object
        },
        refresh:{
            type:Function
        }
    },
    name: 'CommentsOne',

    data: () => ({
        commentsList: [],
        textNew: "",
        flag: true
    }),
    async created() {
    },
    methods: {
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
                this.refresh()
            })
        },
        async deleteComment() {
            await axios.delete('http://localhost:3002/articles/' + this.id + '/comments/' + this.item.id).then(() => {
                this.refresh()
            })
        },
        async editComment() {
            let localText = this.text;
            if (this.textNew != "") {
                localText = this.textNew
            }
            await axios('http://localhost:3002/articles/' + this.id + '/comments/' + this.item.id, {
                method: "patch",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "text": localText
                })
            })
                .then(() => {
                    this.flag = true;
                    this.refresh()
                })
        },
        textChange(e) {
            this.textNew = e.target.value
        },
    }
}
</script>