const initialState = {
  openLogin: true,
  openSignUp: false,
  openForeg: false
}

export default function loginReducer(state = initialState, action) {
  // const { type } = action;
  // console.log(type);
  switch (action.type) {
    case 'OPEN_LOGIN':  state.openLogin=true; state.openSignUp=false; state.openForeg=false; return state;
    case 'OPEN_SIGNUP': state.openLogin=false; state.openSignUp=true; state.openForeg=false; return state;
    case 'OPEN_FOREG':  state.openLogin=false; state.openSignUp=false; state.openForeg=true; return state;

    case 'CLOSE_LOGIN':  state.openLogin=false;   return state;
    case 'CLOSE_SIGNUP': state.openSignUp=false;  return state;
    case 'CLOSE_FOREG':  state.openForeg=false;   return state;

    default: return state
  }
}