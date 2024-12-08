'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   Province.belongsTo(models.Image, {foreignKey: 'imagesId', targetKey: 'id', as: 'images'})
    //   Province.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'user'})
    }
  }
  Province.init({
    code: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};