import React, { Component, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button, StatusBar  } from 'react-native';
import Styles from './styles';
import Settings from '../../settings';
import { userActions } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from "react-redux";


const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("admin@gmail.com");
  const [password, onChangePassword] = React.useState("123456");
  // const [error, onChangeError] = React.useState();

  const dispatch = useDispatch();
  const error = useSelector(state => state.user.error);
  const loggedIn = useSelector(state => state.user.loggedIn);
 
  useEffect(() => {
    if(loggedIn){
      navigation.replace('MainTabs')
    }
    else {
      dispatch(userActions.refresh())
    }
  }, [loggedIn]);

  return (
    <View style={Styles.screen}>
      <View style={Styles.container}>
        <Text
          style={Styles.title}
        >Đăng nhập</Text>
        <TextInput
          style={Styles.textInput}
          onChangeText={text => onChangeEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={[Styles.textInput, { marginBottom: 40 }]}
          secureTextEntry={true}
          onChangeText={text => onChangePassword(text)}
          value={password}
          placeholder="Mật khẩu"

        />
        {
          error &&
          <Text
            style={Styles.error}
          >{error}</Text>
        }
        <Button
          title="Đăng nhập"
          color="#f194ff"
          onPress={() => dispatch(userActions.login(email, password))}
        />
      </View>
    </View>
  );
}

export default LoginScreen