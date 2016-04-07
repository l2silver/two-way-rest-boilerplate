exports.up = function(knex, Promise) {
	return knex.schema.createTable('tasks', function (table) {
	  table.increments();
	  table.string('name');
	  table.boolean('completed');
	  table.integer('todo_list_id').index().unsigned();
	  table.timestamps();
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks')
};