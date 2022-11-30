//Modelo
module.exports = (Sequelize,DataTypes)=>{
    let alias = "Toastlevel";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncremente: true
        },
        toastlevelname:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'toastlevel',
        timestamps: false
    }
    
    const Toastlevel = Sequelize.define(alias, cols, config);

    Toastlevel.associate = function(models){ 
        Toastlevel.hasMany(models.Product, {
            as: "associateToastlevel",
            foreignKey: "toastlevel_id"
        })
    }
    
    return Toastlevel;
}