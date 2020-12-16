module.exports = function (sequelize, DataTypes) {
  return sequelize.define('listing', {
    picture: {
      type: DataTypes.STRING,
      defaultValue: 'business.jpg'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
}
