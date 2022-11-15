//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Product";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            auntoincremente: true
        },
        productname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productprice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productdiscount:{
            type: DataTypes.INTEGER
        },
        productdescription:{
            type: DataTypes.STRING,
            allowNull: false
        },
        productorigin: {
            type: DataTypes.STRING
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
            type: DataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'Product',
        timestamps: false
    }
    
    const Product = Sequelize.define(alias, cols, config);

    Product.associate = function(models){ 
        Product.belongsTo(models.Category, {
            as: "associateCategory",
            foreignKey: "category_id"
        })
        Product.hasMany(models.Productimage, {
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
        Product.belongsTo(models.Toastlevel, {
            as: "associateToastlevelP",
            foreignKey: "toastlevel_id"
        })
    }

    return Product;
}