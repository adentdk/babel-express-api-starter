require('../config');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    queryInterface.bulkInsert('User', [
      {
        username: process.env.BASIC_AUTH_USERNAME,
        password: bcrypt.hashSync(process.env.BASIC_AUTH_PASSWORD, 10),
        fullName: 'Basic Auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  },
};
