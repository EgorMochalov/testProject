import { createRouter,createWebHashHistory } from "vue-router";
import ArticlePage from './components/ArticlePage'
import MainPage from './components/MainPage'
import CommentsPage from './components/CommentsPage'

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/',component:MainPage},
        {path:'/articles',component:ArticlePage},
        {path:'/articles/:id/comments',component:CommentsPage}
    ]
})