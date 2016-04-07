import React, {Component} from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configure from './store'
import {setAddress, setStore} from 'two-way-rest';

setAddress('http://localhost:8888');

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)
setStore(store)
function generateWebsite(App, store){
	return class Website extends Component {
			render(){
				return (
					<Provider store={this.props.store ? this.props.store: store}>
					    <Router history={history}>
					      <Route path="/" component={App}>
					      </Route>
					    </Router>
					  </Provider>
					)
			}
		} 
}


export default function(App, oldStore){
	if(oldStore){
		return generateWebsite(App, oldStore);
	}
	return generateWebsite(App, store)

}

export const oldStore = store;