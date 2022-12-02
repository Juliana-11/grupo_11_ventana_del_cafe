//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Order";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalProducts:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shippingMethod: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'order',
        timestamps: false
    }
    
    const Order = Sequelize.define(alias, cols, config);

    Order.associate = function(models){
        Order.belongsToMany(models.Product, {
            as: "associateOrderNumber",
            through: "orderItem",
            foreignKey: "order_id",
            otherKey: "originalProduct_id",
            timestamps: false
        })
    }

    return Order;
}