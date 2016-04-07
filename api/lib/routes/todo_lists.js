import route from 'koa-route'
import TodoList from './../models/TodoList'
import Task from './../models/Task'
import parse  from 'co-body'

export default [
	route.get('/todo_lists', function*() {
		const todoLists = yield new TodoList().fetchAll({withRelated: ['tasks']})
		this.body = yield todoLists.toJSON()
	})
	, route.post('/todo_lists', function*() {
		const body = yield parse.json(this);
		const newTodoList = yield TodoList.forge({name: body.name}).save();
		this.body = yield newTodoList.toJSON();
	})
	, route.get('/todo_lists/:id', function*(id) {
		const body = yield parse.json(this);
		const todoList = yield new TodoList().find(id)
		this.body = todoList.toJSON()
	})
	, route.put('/todo_lists/:id', function*(id) {
		const body = yield parse.json(this);
		const todoList = yield new TodoList({id}).save({name: body.name}, {patch: true});
		this.body = yield todoList.toJSON();
	})
	, route.put('/todo_lists/:id/complete_all', function*(id) {
		const body = yield parse.json(this);
		const tasks = yield Task.where({todo_list_id: id}).fetchAll();
		
		for (let task of tasks.toJSON()) {
  			yield new Task({id: task.id}).save({completed: true}, {patch: true})
		}
		const completedArray = tasks.toJSON().map((task)=>{
			task.completed = 1
			return task
		})
		this.body = yield {tasks: completedArray}

	})
	, route.put('/todo_lists/:id/clear_completed', function*(id) {
		const body = yield parse.json(this);
		const tasks = yield Task.where({todo_list_id: id, completed: 1}).fetchAll();
		
		for (let task of tasks.toJSON()) {
  			yield new Task({id: task.id}).destroy()
		}
		const deletedArray = tasks.toJSON().map((task)=>{
			task.deleted_at = new Date().getTime()
			return task
		})
		
		this.body = yield {tasks: deletedArray}
	})
	, route.delete('/todo_lists/:id', function*(id) {
		const body = yield parse.json(this);
		const todoList = yield new TodoList({id}).destroy()
		this.body = yield todoList.toJSON();
	})
];