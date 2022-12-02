//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "ToastLevel";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        toastLevelName:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'toastLevel',
        timestamps: false
    }
    
    const ToastLevel = Sequelize.define(alias, cols, config);

    ToastLevel.associate = function(models){ 
        ToastLevel.hasMany(models.Product, {
            as: "associateToastlevel",
            foreignKey: "toastLevel_id"
        })
    }
    
    return ToastLevel;
}