
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo_lists', function (table) {
  table.increments();
  table.string('name');
  table.timestamps();
})


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todo_lists')
};