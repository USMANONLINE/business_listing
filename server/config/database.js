const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'listingdb',
  'root',
  '', {
    logging: false,
    dialect: 'mariadb'
});

const model = {}

// Register Models
model.image = require('../models/image')(sequelize, DataTypes);
model.listing = require('../models/Listing')(sequelize, DataTypes);
model.category = require('../models/Category')(sequelize, DataTypes);
model.listing_image = sequelize.define('listing_image', {});
model.listing_category = sequelize.define('listing_category', {});

// Listing image relationship
model.listing.belongsToMany(model.image, { through: model.listing_image });
model.image.belongsToMany(model.listing, { through: model.listing_image });
// Listing category relationship
model.listing.belongsToMany(model.category, { through: model.listing_category });
model.category.belongsToMany(model.listing, { through: model.listing_category });

// Build Models
sequelize.sync({ alter: true }).then(response => {
    console.log(response)
}).catch(error => {
    console.log(error)
})

module.exports = model;
