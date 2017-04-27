'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    PostId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Post)
        // associations can be defined here
      }
    }
  });
  return Comment;
};
