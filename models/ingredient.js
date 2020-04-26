'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING
  }, {});
  ingredient.associate = function(models) {
    // associations can be defined here
    ingredient.belongsToMany(models.fave, {
      through: 'cocktailIngredient'
    })
  };
  return ingredient;
};