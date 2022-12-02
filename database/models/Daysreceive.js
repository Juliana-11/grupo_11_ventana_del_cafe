//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "DaysReceive";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        dayName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'daysReceive',
        timestamps: false
    }
    
    const DaysReceive = Sequelize.define(alias, cols, config);

    DaysReceive.associate = function(models){ 
        DaysReceive.belongsToMany(models.User, {
            as: "DaysReceive",
            through: "Day_user",
            foreignKey: "day_id",
            otherKey: "user_id",
            timestamps: false
        })
    }
    return DaysReceive;
}