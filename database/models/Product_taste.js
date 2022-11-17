//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Product_taste";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremente: true
        },
        taste_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.STRING,

        }
    };
    let config = {
        tableName: 'product_taste',
        timestamps: false
    }
    
    const Product_taste = Sequelize.define(alias, cols, config);

    return Product_taste;
}