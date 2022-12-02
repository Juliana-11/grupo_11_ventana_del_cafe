//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "ProductImage";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncremente: true
        },
        productImageName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
        
    };
    let config = {
        tableName: 'productImage',
        timestamps: false
    }
    
    const ProductImage = Sequelize.define(alias, cols, config);
    ProductImage.associate = function(models){ 
        ProductImage.belongsTo(models.Product, {
            as: "ProductImage",
            foreignKey: "product_id"
        })
    }
    
    return ProductImage;
}