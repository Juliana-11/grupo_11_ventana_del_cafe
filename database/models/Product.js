//Modelo
module.exports = (Sequelize, DataTypes)=>{
    let alias = "Product";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productDiscount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productDescription:{
            type: DataTypes.STRING,
            allowNull: false
        },
        originProduct: {
            type: DataTypes.STRING,
            allowNull:false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toastlevel_id:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'product',
        timestamps: false
    }
    
    const Product = Sequelize.define(alias, cols, config);

    Product.associate = function(models){ 
        Product.belongsTo(models.Category, {
            as: "associateCategory",
            foreignKey: "category_id"
        })
        Product.hasMany(models.ProductImage, {
            as: "associateImage",
            foreignKey: "product_id"
        })
        Product.belongsToMany(models.Taste, {
            as: "associateProduct_taste",
            through: "product_taste",
            foreignKey: "product_id",
            otherKey: "taste_id",
            timestamps: false
        })
        Product.belongsTo(models.ToastLevel, {
            as: "associateToastLevelP",
            foreignKey: "toastLevel_id"
        })
        Product.belongsToMany(models.Order, {
            as: "associateOrders",
            through: "orderItem",
            foreignKey: "originalProduct_id",
            otherKey: "order_id",
            timestamps: false
        })
    }

    return Product;
}