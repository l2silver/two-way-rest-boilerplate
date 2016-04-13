import React, { Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { connect } from 'react-redux'
import {mapIf, DeclareReducer, TWRDestroyFront, TWRShowFront, TWRCreateFront, TWRCreateChildFront, TWRUpdateFront, TWRIndexFront} from 'two-way-rest'

require('font-awesome/less/font-awesome.less');

class Page extends Component{
  filter(type){
    switch(type){
      case 'completed':
        return instance=>instance.get('completed')
      case 'todo':
        return instance=>instance.get('completed') != 1
    }
    return x => x.get('id')
  }
  render(){
    
    return <div>
          <h1 className={style.title}>Todos</h1>
          <DeclareReducer reducer='todos'>
            <div className={style.normal}>
              <div className={style.todoListMenu}>
                <TWRCreateFront tree={['todo_lists']} className={style.createTodoList}>
                  <input type='text' name='name' defaultValue='New Todo List' />
                  <button>Create</button>
                </TWRCreateFront>
                
                <TWRCreateFront tree={['selectLists']} id='1' replace={(selectList)=>{
                  return <TWRIndexFront tree={['todo_lists']} replace={(todoLists)=>{
                    return <ul style={{position: 'relative'}}>
                    {mapIf(todoLists.instance(), (todoList)=>{
                      
                      return <li><div className={style.flexbox}>
                          <TWRUpdateFront instance={todoList} content={{toggleEdit: false}} replace={(updateTodoList)=>{
                            if(todoList.get('toggleEdit')){
                              
                              return <div className={style.content}><form>
                                        <input type='text' name='name' defaultValue={todoList.get('name')} />
                                        <button onClick={updateTodoList.submitForm}>Save</button>
                                      </form>
                                    </div>

                            }
                            return <p onClick={()=>selectList.submitContent({todoListId: todoList.gex('id')})} 
                            onDoubleClick={()=>updateTodoList.submitContent({toggleEdit: true})}>{todoList.get('name')}</p>
              
                          }} />
                          <div className={style.destroy}>
                            
                            <TWRDestroyFront tag='button' instance={todoList} noPrompt='true' />
                          
                          </div>
                        </div>
                      </li>
                    })}
                    </ul>
                }} />
              }} />
            </div>
            <div className={style.displayTodoList}>
              <TWRShowFront tree={['selectLists', '1']} replace={(selectedList)=>{
                
                return <TWRShowFront tree={['todo_lists', selectedList.instance().get('todoListId')]} replace={(selectedTodoList)=>{
                  const todoList = selectedTodoList.instance();
                  return <div>
                  {
                    
                    <TWRUpdateFront instance={todoList} replace={(filter)=>{
                      return <div>
                        <label>All<input onClick={()=>filter.submitContent({filterType: ''})} defaultChecked={todoList.get('filterType') == ''} type='radio' name='filterType' value='' /></label>
                        <label>Completed<input onClick={()=>filter.submitContent({filterType: 'completed'})} defaultChecked={todoList.get('filterType') == 'completed'} type='radio' name='filterType' value='completed' /></label>
                        <label>To Do<input onClick={()=>filter.submitContent({filterType: 'todo'})} defaultChecked={todoList.get('filterType') == 'todo'} type='radio' name='filterType' value='todo' /></label>
                        <div style={{display: 'block'}}>
                          <div onClick={()=>{
                            const completedToDos = (todoList.gex('tasks') ? 
                            todoList.gex('tasks')
                            .toSeq()
                            .map((i)=>i.set('completed', 1).delete('tree').delete('_globeTWR').toJS())
                            .toArray()
                            :
                            {});
                            filter.submitContent({
                            tasks: completedToDos
                          })}} style={{'marginLeft': '40px', cursor: 'pointer'}}>Complete All</div>
                        <div onClick={()=>{filter.custom(
                            (state)=>{
                              const completedTasks = todoList.gex('tasks') 
                              ? todoList.gex('tasks').toSeq().filter(v=>v.get('completed')).toArray()
                              : [];
                              const deletedState = completedTasks.reduce((previousState, completedTask)=>{
                                return previousState.deleteIn(['tasks', completedTask.get('id').toString()])
                              }, state.asMutable());
                              console.log('deletedState', deletedState.toJS())
                              return deletedState.asImmutable();
                            }
                          )}} style={{'marginLeft': '40px', cursor: 'pointer'}}>Clear Completed</div>
                        </div>
                      </div>
                    }} />
                      
                    
                    
                  }
                    
                    
                    <h2>{todoList.gex('name')}</h2>
                    <TWRCreateChildFront instance={todoList} childName='tasks' content={{name: 'New Task'}}>
                      <button>Create</button>
                    </TWRCreateChildFront>
                    {
                      todoList.gex('tasks') ? 
                      
                      <ul>
                        {mapIf(todoList.gex('tasks').filter(this.filter(todoList.get('filterType'))), (task)=>{
                          return <li>
                            <TWRDestroyFront instance={task} noPrompt='true'  className={style.destroy}>
                              
                              <button/>
                            
                            </TWRDestroyFront>
                            <TWRUpdateFront instance={task} content={{toggleEdit: false}} replace={(updateTask)=>{
                              if(task.get('toggleEdit')){
                                
                                return <form>
                                          <input type='text' name='name' defaultValue={task.get('name')} />
                                          <button onClick={updateTask.submitForm}>Save</button>
                                        </form>

                              }
                              return <div>

                                <i
                                onClick={()=>updateTask.submitContent({completed: !task.get('completed')})}
                                className={classnames('fa', style.checkbox,
                                  {'fa-circle-o': !task.get('completed')
                                  , 'fa-check-circle-o': task.get('completed')}
                                )} />
                                
                                <p className={classnames({[style.completed]:task.get('completed')})} 
                                onDoubleClick={()=>updateTask.submitContent({toggleEdit: true})}>{task.get('name')}</p>  
                              
                              </div>

                              

                            }} />
                          </li>
                        })}

                      </ul>
                      : 
                      ''
                    }
                  </div>
                }}/>

              }}/>
            </div>
          </div>
        </DeclareReducer>
      </div>
  }
}

/*


*/


function mapStateToProps(state) {
  console.log('State', state.todos.toJS())
  return {}
}

export default connect(
  mapStateToProps
)(Page)


