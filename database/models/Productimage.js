//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Productimage";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        productimagename:{
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
        
    };
    let config = {
        tableName: 'productimage',
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