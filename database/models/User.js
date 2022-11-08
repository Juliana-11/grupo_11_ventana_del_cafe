const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require('.');
const db = db.Sequelize();

module.exports = (Sequelize,DataTypes)=>{
    let alias = 'User';
    let cols = {
        iduser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        userlastname:{
            type: DataTypes.STRING,

        },
        useremail:{
            type: DataTypes.STRING
        },
        userAs:{
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        useravatar:{
            type: DataTypes.STRING
        },
        userphone: {
            type: DataTypes.INTEGER
        },
        useraddress: {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName: 'user',
        timestamps: false,
        };
    const User = sequelize.define(alias,cols,config)
    return User;
}

