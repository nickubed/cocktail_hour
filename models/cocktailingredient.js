'use strict';
module.exports = (sequelize, DataTypes) => {
  const cocktailIngredient = sequelize.define('cocktailIngredient', {
    faveId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {});
  cocktailIngredient.associate = function(models) {
    // associations can be defined here
  };
  return cocktailIngredient;
};