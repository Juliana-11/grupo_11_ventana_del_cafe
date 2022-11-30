//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userlastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        useremail:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userAs:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        useravatar:{
            type: DataTypes.STRING,
            allowNull:false
        },
        userphone: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        useraddress: {
            type: DataTypes.STRING,
            allowNull:false
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
        }),
        User.belongsToMany(models.Product, {
            as: "associateUserbuy",
            through: "shoppingcart",
            foreignKey: "userbuy_id",
            otherKey: "productbuy_id",
            timestamps: false
        })
    }
    
    return User;
}


