'use strict';
const M = require('../models/index');
const Post = M.Post;
const faker = require('faker');

const posts = Array
  .from({length: 50})
  .map(function(){
    return Post.create({
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.hacker.phrase()
    })
  })

module.exports = {
    up: function(queryInterface, Sequelize) {

    // return Post.create({ title: "First Post",
    //     description: "Start the blog with express" });
    return Promise.all(posts)

    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
