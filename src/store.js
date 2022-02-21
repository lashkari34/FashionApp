import {createStore, combineReducers} from 'redux'
import { reducer } from './redux/reducers/reducer'

const rootReducer = combineReducers({
  fashion: reducer
})

const configuredStore = () => createStore(rootReducer);

export default configuredStore