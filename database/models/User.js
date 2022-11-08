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
        timestamps: false
    };

    const User = Sequelize.define(alias,cols,config)

    /*User.associate = function(models){ 
        User.belongsToMany(models.Daysreceive, {
            as: "Day_user",
            through: "Day_user",
            foreignKey: "iduser",
            otherKey: "iddaysreceive",
            timestamps: false
        })
    }*/
    
    return User;
}


