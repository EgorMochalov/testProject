const sequelize = require('./db.js')
const { DataTypes } = require('sequelize')

const articles = sequelize.define('articles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: false, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false }
})

const comments = sequelize.define('comments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false }
})

articles.hasMany(comments,{ onDelete: 'cascade' })
comments.belongsTo(articles,{onDelete: 'cascade'})


articles.sync();
comments.sync()

module.exports = {
    articles,comments
}
