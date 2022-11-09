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

    /*Product.associate = function(models){ 
        Product.belongsTo(models.Category, {
            as: "associateCategory",
<<<<<<< HEAD
=======
            foreignKey: "category_id"
>>>>>>> 80ce229923ad7bf08e95f442dcdef8285954a0f9
        })
        Product.belongsTo(models.Productimage, {
            as: "Productimage_id",
            foreignKey: "idproduct",
            targetId: "product_id"
        })
    }*/

    return Product;
}