"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Comments" 
      ADD CONSTRAINT "fkey-post-id-Comments"
      FOREIGN KEY ("post_id")
      REFERENCES "Posts" ("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE
    `);

    await queryInterface.addColumn("Comments", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.sequelize.query(`
      ALTER TABLE "Comments"
      ADD CONSTRAINT "fkey-user-id-Comments"
      FOREIGN KEY ("user_id")
      REFERENCES "Users" ("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Comments", "fkey-post-id-Comments");
    await queryInterface.removeColumn("Comments", "user_id");
  },
};
