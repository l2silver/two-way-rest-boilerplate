import bookshelf from './bookshelf'
import Task from './Task'
export default bookshelf.Model.extend({
  tableName: 'todo_lists',
  hasTimestamps: 'true',
  tasks: function() {
    return this.hasMany(Task);
  }
});