import todo_list from './todo_lists'
import tasks from './tasks'

const controllers = [
	todo_list,
	tasks
]

export default (app)=>{
	return controllers.map((routes)=>{
		return routes.map((route)=>{
			return app.use(route);
		})
	})
}

