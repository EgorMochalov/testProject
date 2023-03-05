const {comments} = require('./modules')

class comments_controller {
    async comments_add(req, res) {
        const { idArticle } = req.params
        const { text } = req.body
        await comments.create({text:text,articleId:idArticle}).then(()=>{
            res.json("Добавлено")
        })
    }
    async comments_delete(req, res) {
        const {id}= req.params
        if (!id) {
            res.json('Не задан ID')
        }
        else{
            await comments.destroy({
                where: { id: Number(id) },
              }).then(()=>{
                res.json("Удалено")
              })
        }
    }
    async comments_get_one(req, res, next) {
        const { id } = req.params
        if (!id) {
            return res.json('Не задан ID')
        }
        else{
            res.json(await comments.findOne({where:{id:Number(id)}}))
        }
    }
    async comments_patch(req, res, next) {
        const { id } = req.params
        const {text} = req.body
        if (!id) {
            return res.jsno('Не задан ID')
        }
        else{
            await comments.update({text:text},{
                where:{id:Number(id)}
            }).then(()=>{
                res.json("Обновлено")
              })
        }
    }
    async comments_get_all(req, res) {
        const { idArticle } = req.params
        res.json(await comments.findAll({where:{articleId:Number(idArticle)}}))
    }
}


module.exports = new comments_controller()