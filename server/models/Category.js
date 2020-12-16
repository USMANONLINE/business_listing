module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })
}
