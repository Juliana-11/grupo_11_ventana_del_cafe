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
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userLastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail:{
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
        userAvatar:{
            type: DataTypes.STRING,
            allowNull:false
        },
        userPhone: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        userAddress: {
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
        User.belongsToMany(models.DaysReceive, {
            as: "associateDay_user",
            through: "Day_user",
            foreignKey: "user_id",
            otherKey: "day_id",
            timestamps: false
        })
        User.hasMany(models.Order, {
            as: "associateUserbuy",
            foreignKey: "user_id",
        })
    }
    
    return User;
}


