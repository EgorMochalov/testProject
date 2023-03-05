const articles_controller = require('./articles_controller')
const comments_controller = require('./comments_controller')
const router = app => {
    app.route('/articles/:id')
    .get(articles_controller.article_get_one)
    .delete(articles_controller.article_delete)
    .patch(articles_controller.article_patch)

    app.route('/articles')
    .get(articles_controller.article_get_all)
    .post(articles_controller.article_add)

    app.route('/articles/:idArticle/comments/:id')
    .get(comments_controller.comments_get_one)
    .delete(comments_controller.comments_delete)
    .patch(comments_controller.comments_patch)

    app.route('/articles/:idArticle/comments')
    .get(comments_controller.comments_get_all)
    .post(comments_controller.comments_add)
}
module.exports = router;