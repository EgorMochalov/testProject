const {articles} = require('./modules')

class article_controller {
    async article_add(req, res) {
        await articles.create({title:req["body"]["title"],text:req["body"]["text"]}).then(()=>{
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
        if (!id) {
            return res.jsno('Не задан ID')
        }
        else{
            await articles.update({title:req["body"]["title"],text:req["body"]["text"]},{
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