'use strict';
module.exports = (sequelize, DataTypes) => {
  const fave = sequelize.define('fave', {
    name: DataTypes.STRING
  }, {});
  fave.associate = function(models) {
    // associations can be defined here
    fave.belongsToMany(models.ingredient, {
      through: 'cocktailIngredient'
    })
  };
  return fave;
};