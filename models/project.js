module.exports = function (sequelize, DataTypes) {
    let Project = sequelize.define("Project", {
        title: {
            type: DataTypes.STRING(),
            primaryKey: true,
        },
        description: DataTypes.STRING(),
        url: DataTypes.STRING(),

    });





    return Project;
}