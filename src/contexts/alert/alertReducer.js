import {HIDE_ALERT, SHOW_ALERT} from '../type'

const handlers = {
  [SHOW_ALERT]:(state, action) => action.payload,
  [HIDE_ALERT]:() => null,
  DEFAULT: state => state
}

// const handlers1 = {
//   [SHOW_ALERT]:(state, {payload}) => ({...payload, visible:true}),
//   [HIDE_ALERT]:state => ({...payload, visible:false}),
//   DEFAULT: state => state
// }
const AlertReducer = (state, action) => {

  const handler = handlers[action.type] || handlers.DEFAULT;



  return handler(state,action)

  /*switch (action.type) {
    case SHOW_ALERT : return action.payload
    case HIDE_ALERT : return null
    default :return state
  } */

}

export default AlertReducer;
