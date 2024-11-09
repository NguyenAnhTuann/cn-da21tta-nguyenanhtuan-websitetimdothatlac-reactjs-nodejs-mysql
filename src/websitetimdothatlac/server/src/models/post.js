'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: DataTypes.STRING,
    label: DataTypes.STRING,
    address: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.STRING,
    authorId: DataTypes.STRING,
    imagesId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};