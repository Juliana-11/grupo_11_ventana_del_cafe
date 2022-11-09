//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Category";
    let cols = {
        idcategory:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremente: true
        },
        categoryname: {
            type: DataTypes.STRING,
            allowNull: false
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