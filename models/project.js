module.exports = function(sequelize, DataTypes) {
    let Project = sequelize.define("Project", {
        title: {
            type: DataTypes.STRING(),
            primaryKey: true,
        },
        description: DataTypes.STRING(),
        url: DataTypes.STRING(),
       
    });

    // Project.associate = function(models) {
    //     Project.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: true,
    //         },
    //     });
    // }

  

    return Project;
}