import route from 'koa-route'
import Task from './../models/Task'
import parse  from 'co-body'


function addProps(body = {}, properties = []){
	return properties.reduce((previousObject, property)=>{
		if(typeof body[property] == undefined){
			return previousObject
		}
		return Object.assign({}, previousObject, {[property]: body[property]})
	}, {})
}

export default [
	route.get('/tasks', function*() {
		const tasks = yield new Task().fetchAll()
		this.body = yield tasks.toJSON()
	})
	, route.post('/tasks', function*() {
		const body = yield parse.json(this);
		const newTask = yield Task.forge({name: body.name, todo_list_id: body.todo_list_id}).save();
		this.body = yield newTask.toJSON();
	})
	, route.get('/tasks/:id', function*(id) {
		const body = yield parse.json(this);
		const task= yield new Task().find(id)
		this.body = task.toJSON()
	})
	, route.put('/tasks/:id', function*(id) {
		const body = yield parse.json(this);
		const task= yield new Task({id}).save(addProps(body, ['name', 'completed', 'todo_list_id']), {patch: true});
		this.body = yield task.toJSON();
	})
	, route.delete('/tasks/:id', function*(id) {
		const body = yield parse.json(this);
		const task= yield new Task({id}).destroy()
		this.body = yield task.toJSON();
	})
];