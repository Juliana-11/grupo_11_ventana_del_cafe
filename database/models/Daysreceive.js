//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Daysreceive";
    let cols = {
        iddaysreceive:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremente: true
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