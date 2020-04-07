import React, { Component, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import Styles from './styles';
import { userActions } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from '@react-navigation/native';

const SellingScreen = ({ navigation }) => {
  const user = useSelector(state => {
    var r = state.user.user ? state.user.user.user : {} 
    return r
  });
  const loggedIn = useSelector(state => state.user.loggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout())
  }

  useEffect(() => {
    console.log(user)
    if(!loggedIn){
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login' }
          ],
        })
      );
    }
  }, [loggedIn]);



  return (
    <View style={Styles.screen}>
      <View>
        <Text style={Styles.title}>TÀI KHOẢN</Text>
      </View>
      <View style={Styles.textContainer}>
        <Text style={{flex: 1, fontSize: 20}}>Email: </Text>
        <Text style={{flex: 3, fontSize: 20, fontWeight:"bold"}}>{user.email || ''}</Text>
      </View>
      <View style={Styles.textContainer}>
        <Text style={{flex: 1, fontSize: 20}}>Tên: </Text>
        <Text style={{flex: 3, fontSize: 20, fontWeight:"bold"}}>{user.name  || ''}</Text>
      </View>
      <View style={Styles.btnContainer}>
        <Button
          title="Đổi mật khẩu"
          color="#C06C84"
          onPress={()=>logout()}
        />
      </View>
      <View style={Styles.btnContainer}>
        <Button
          title="Đăng xuất"
          color="#F67280"
          onPress={()=>logout()}
        />
      </View>
    </View>
  );
}

export default SellingScreen