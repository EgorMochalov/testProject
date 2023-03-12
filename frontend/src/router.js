import { createRouter,createWebHashHistory } from "vue-router";
import ArticlePage from './components/ArticlePage'
import CommentsPage from './components/CommentsPage'
import ArticleOnePage from './components/ArticleOnePage'

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/articles',component:ArticlePage,alias:'/'},
        {path:'/articles/:id',component:ArticleOnePage,props: (route) => ({ id: route.params.id })},
        {path:'/articles/:id/comments',component:CommentsPage,props: (route) => ({ id: route.params.id })}
    ]
})