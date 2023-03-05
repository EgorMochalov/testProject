const {articles} = require('./modules')

class article_controller {
    async article_add(req, res) {
        const { title, text } = req.body
        await articles.create({title:title,text:text}).then(()=>{
            res.json("Добавлено")
        })
    }
    async article_delete(req, res) {
        const {id}= req.params
        if (!id) {
            res.json('Не задан ID')
        }
        else{
            await articles.destroy({
                where: { id: Number(id) },
              }).then(()=>{
                res.json("Удалено")
              })
        }
    }
    async article_get_one(req, res, next) {
        const { id } = req.params
        if (!id) {
            return res.json('Не задан ID')
        }
        else{
            res.json(await articles.findOne({where:{id:Number(id)}}))
        }
    }
    async article_patch(req, res, next) {
        const { id } = req.params
        const {title,text} = req.body
        if (!id) {
            return res.jsno('Не задан ID')
        }
        else{
            await articles.update({title:title,text:text},{
                where:{id:Number(id)}
            }).then(()=>{
                res.json("Обновлено")
              })
        }
    }
    async article_get_all(req, res) {
        res.json(await articles.findAll())
    }
}


module.exports = new article_controller()