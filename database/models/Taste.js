//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Taste";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        tastename:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'taste',
        timestamps: false
    }
    
    const Taste = Sequelize.define(alias, cols, config);

    Taste.associate = function(models){ 
        Taste.belongsToMany(models.Product, {
            as: "associateTaste_product",
            through: "product_taste",
            foreignKey: "taste_id",
            otherKey: "product_id",
            timestamps: false
        })
    }
    
    return Taste;
}