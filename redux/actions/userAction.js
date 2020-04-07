import { userService } from '../services/userService'

export const userConstants = {
  LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
  LOGIN_NEED_RELOGIN: 'USER_USER_LOGIN_FAILURE',
  LOGGED_OUT: 'USER_LOGGED_OUT',
};

const request = () => { return { type: userConstants.LOGIN_REQUEST } }
const success = (user) => { return { type: userConstants.LOGIN_SUCCESS, user } }
const failure = (error) => { return { type: userConstants.LOGIN_FAILURE, error } }
const relogin = () => { return { type: userConstants.LOGIN_NEED_RELOGIN } }
const loggedOut = () => { return { type: userConstants.LOGGED_OUT }}
const login = (email, password) => {

  return dispatch => {
    dispatch(request());
    userService.login(email, password)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
}

const logout = () => {
  return dispatch => {
    userService.logout()
      .then(() => {
        dispatch(loggedOut());
      },
      error => {
        console.log(error)
      });
  };
}

const refresh = () => {
  return dispatch => {
    userService.refresh()
      .then(user => {
        dispatch(success(user));
      },
      error => {
        dispatch(relogin());
      });
  };
}

export const userActions = {
  login,
  logout,
  refresh
};

