const initialState = {
  openLogin: true,

}

export default function loginReducer(state = initialState, action) {
  // const { type } = action;
  // console.log(type);
  switch (action.type) {
    case 'OPEN_LOGIN':  state.openLogin=true; state.openSignUp=false; return state;
    case 'OPEN_SIGNUP':  state.openLogin=false; state.openSignUp=true; return state;
    case 'CLOSE_LOGIN':  state.openLogin=false; return state;
    default: return state
  }
}