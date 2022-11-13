//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Productimage";
    let cols = {
        idproductimage:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            auntoincremente: true
        },
        productimageaddress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id:{
            type: DataTypes.INTEGER,
        }
        
    };
    let config = {
        tableName: 'Productimage',
        timestamps: false
    }
    
    const Productimage = Sequelize.define(alias, cols, config);
    Productimage.associate = function(models){ 
        Productimage.belongsTo(models.Product, {
            as: "Productimage",
            foreignKey: "product_id"
        })
    }
    
    return Productimage;
}