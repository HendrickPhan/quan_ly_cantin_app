import {userConstants} from '../actions/userAction'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggedIn: false,
        user: null,
        error: null
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.error
      };
    case userConstants.LOGGED_OUT:
      console.log("Here")
      return {
        loggedIn: false,
      };
    default:
      return state
  }
}


export default userReducer