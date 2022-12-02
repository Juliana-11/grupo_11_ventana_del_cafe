//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "OrderItem";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        order_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        originalProduct_id:{
            type: DataTypes.INTEGER,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productDiscount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        originProduct: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'orderItem',
        timestamps: false
    }
    
    const OrderItem = Sequelize.define(alias, cols, config);

    return OrderItem;
}