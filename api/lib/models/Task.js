import bookshelf from './bookshelf'
export default bookshelf.Model.extend({
  tableName: 'tasks',
  hasTimestamps: 'true'
});