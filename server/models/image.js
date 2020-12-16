module.exports = function (sequelize, DataTypes) {
  return sequelize.define('image', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altText: {
      type: DataTypes.STRING,
      defaultValue: 'Unable to load image'
    }
  })
}
