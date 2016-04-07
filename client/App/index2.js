import React, { Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { connect } from 'react-redux'
import {mapIf, DeclareReducer, TWRDestroy, TWRDestroyFront, TWRShowFront, TWRCreateFront, TWRCreate, TWRCreateChild, TWRCreateChildFront, TWRUpdate, TWRUpdateFront, TWRIndex,TWRIndexFront} from 'two-way-rest'

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
                <TWRCreate tree={['todo_lists']} className={style.createTodoList}>
                  <input type='text' name='name' defaultValue='New Todo List' />
                  <button>Create</button>
                </TWRCreate>
                
                <TWRCreateFront tree={['selectLists']} id='1' replace={(selectList)=>{
                  return <TWRIndex tree={['todo_lists']} replace={(todoLists)=>{
                    return <ul style={{position: 'relative'}}>
                    {mapIf(todoLists.instance(), (todoList)=>{
                      
                      return <li><div className={style.flexbox}>
                          <TWRUpdate instance={todoList} content={{toggleEdit: false}} replace={(updateTodoList)=>{
                            if(todoList.get('toggleEdit')){
                              
                              return <div className={style.content}><form>
                                        <input type='text' name='name' defaultValue={todoList.get('name')} />
                                        <button onClick={updateTodoList.submitForm}>Save</button>
                                      </form>
                                    </div>

                            }
                            return  <TWRUpdateFront instance={todoList} replace={(updateTodoListFront)=>{
                              return <p onClick={()=>selectList.submitContent({todoListId: todoList.gex('id')})} 
                              onDoubleClick={()=>updateTodoListFront.submitContent({toggleEdit: true})}>{todoList.get('name')}
                            </p>
                            }} />
                          }} />
                          <div className={style.destroy}>
                          <TWRDestroy instance={todoList} noPrompt='true' tag='button' />
                          </div>
                        </div>
                      </li>
                    })}
                    </ul>
                }} />
              }} />
            </div>
            <div className={style.displayTodoList}>
              <TWRShowFront forceUpdate='true' tree={['selectLists', '1']} replace={(selectedList)=>{
                
                return <TWRShowFront forceUpdate='true' tree={['todo_lists', selectedList.instance().get('todoListId').toString()]} replace={(selectedTodoList)=>{
                  const todoList = selectedTodoList.instance();
                  
                  return <div>
                  
                    {
                    <TWRUpdateFront instance={todoList} replace={(filter)=>{
                      return <div>
                        <label>All<input onClick={()=>filter.submitContent({filterType: ''})} defaultChecked={todoList.get('filterType') == ''} type='radio' name='filterType' value='' /></label>
                        <label>Completed<input onClick={()=>filter.submitContent({filterType: 'completed'})} defaultChecked={todoList.get('filterType') == 'completed'} type='radio' name='filterType' value='completed' /></label>
                        <label>To Do<input onClick={()=>filter.submitContent({filterType: 'todo'})} defaultChecked={todoList.get('filterType') == 'todo'} type='radio' name='filterType' value='todo' /></label>
                        
                        <div style={{display: 'block'}}>
                          <TWRUpdate pathEnd='/complete_all' instance={todoList}>
                            <button>Complete All</button>
                          </TWRUpdate>
                          <TWRUpdate pathEnd='/clear_completed' instance={todoList} style={{display: 'block'}}>
                            <button>Clear Completed</button>
                          </TWRUpdate>
                        </div>
                      </div>
                    }} />
                    
                    }
              
                    <h2>{todoList.gex('name')}</h2>
                    <TWRCreateChild instance={todoList} childName='tasks' content={{name: 'New Task'}}>
                      <button>Create</button>
                    </TWRCreateChild>
                    {
                      todoList.gex('tasks') ? 
                      
                      <ul>
                        {mapIf(todoList.gex('tasks').filter(this.filter(todoList.get('filterType'))), (task)=>{
                          return <li>
                            <div  className={style.destroy} >
                              <TWRDestroyFront tag='button' instance={task} noPrompt='true' />
                            </div>
                            
                            <TWRUpdate instance={task} content={{toggleEdit: false}} replace={(updateTask)=>{
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
                                <TWRUpdateFront forceUpdate='true' instance={task} replace={(updateTaskFront)=>{
                                  return <p 
                                  className={classnames({[style.completed]:task.get('completed')})} 
                                  onDoubleClick={()=>updateTaskFront.submitContent({toggleEdit: true})}>
                                    {task.get('name')}
                                  </p>
                                }} />
                              
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


