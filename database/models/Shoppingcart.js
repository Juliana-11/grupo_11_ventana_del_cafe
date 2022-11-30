//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Shoppingcart";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productbuy_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userbuy_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'shoppingcart',
        timestamps: false
    }
    
    const Shoppingcart = Sequelize.define(alias, cols, config);

    return Shoppingcart;
}