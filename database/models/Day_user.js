//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Day_user";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncremente: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'day_user',
        timestamps: false
    }
    
    const Day_user = Sequelize.define(alias, cols, config);

    return Day_user;
}