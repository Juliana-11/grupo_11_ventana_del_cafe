//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Product";
    let cols = {
        idproduct:{
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
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id:{
            type: DataTypes.STRING,
            allowNull: false
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
    }

    return Product;
}