//Modelo
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
        passwordConfirm: {
            type: DataTypes.STRING
        },
        useravatar:{
            type: DataTypes.STRING
        },
        useraddress: {
            type: DataTypes.STRING
        },
        checkTodos:{
            type: DataTypes.STRING
        },
        checkLunes:{
            type: DataTypes.STRING
        },
        checkMartes:{
            type: DataTypes.STRING
        },
        checkMiercoles:{
            type: DataTypes.STRING
        },
        checkJueves:{
            type: DataTypes.STRING
        },
        checkViernes:{
            type: DataTypes.STRING
        },
        checkSabado:{
            type: DataTypes.STRING
        },
        checkDomingo:{
            type: DataTypes.STRING
        },
        userphone: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'user',
        timestamps: false
    };

    const User = Sequelize.define(alias,cols,config)

    User.associate = function(models){ 
        User.belongsToMany(models.Daysreceive, {
            as: "associateDay_user",
            through: "Day_user",
            foreignKey: "id_user",
            otherKey: "id_day",
            timestamps: false
        })
    }
    
    return User;
}


