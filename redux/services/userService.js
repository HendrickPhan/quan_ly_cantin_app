import Settings from '../../settings'
import AsyncStorage from '@react-native-community/async-storage';

const login = (email, password) => {
  return fetch(Settings.API_DOMAIN + "auth/login", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        return Promise.reject('Sai email hoặc password');
      }
    })
    .then((data) => {
      AsyncStorage.setItem('user', JSON.stringify(data));
      return data
    })
}

const refresh = () => {
  return AsyncStorage.getItem('user')
    .then((user) => {
      console.log(user)
      user = JSON.parse(user)
      return fetch(Settings.API_DOMAIN + "auth/refresh", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token 
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return Promise.reject('Sai email hoặc password');
        }
      })
      .then((data) => {
        AsyncStorage.setItem('user', JSON.stringify(data));
        return data
      })

    })
    .catch(
      () => Promise.reject('Not Login')
    )

}

const logout = () => {
  return AsyncStorage.getItem('user')
    .then((user) => {
      user = JSON.parse(user)
      return fetch(Settings.API_DOMAIN + "auth/logout", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token 
        },
      })
      .then((response) => {
        console.log(response)
        console.log(response.status)
        if (response.status === 200) {
          console.log("OK")
          return "LoggedOut"
        } else {
          return Promise.reject('Không thể đăng xuất');
        }
      })
    })
    .catch(
      () => Promise.reject('Không thể đăng xuất')
    )

}


export const userService = {
  login,
  refresh,
  logout,
};