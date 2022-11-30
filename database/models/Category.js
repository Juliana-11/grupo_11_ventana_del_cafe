//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Category";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        categoryname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    };
    let config = {
        tableName: 'category',
        timestamps: false
    }
    
    const Category = Sequelize.define(alias, cols, config);

    Category.associate = function(models){ 
        Category.hasMany(models.Product, {
            as: "associateProduct",
            foreignKey: "category_id"
        })
    }

    return Category;
}