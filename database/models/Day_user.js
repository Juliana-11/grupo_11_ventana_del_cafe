//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Day_user";
    let cols = {
        idday_user:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremente: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_day: {
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