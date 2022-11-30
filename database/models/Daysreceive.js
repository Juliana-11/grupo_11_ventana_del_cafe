//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Daysreceive";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        dayname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'daysreceive',
        timestamps: false
    }
    
    const Daysreceive = Sequelize.define(alias, cols, config);

    Daysreceive.associate = function(models){ 
        Daysreceive.belongsToMany(models.User, {
            as: "Daysreceive",
            through: "Day_user",
            foreignKey: "id_day",
            otherKey: "id_user",
            timestamps: false
        })
    }
    return Daysreceive;
}