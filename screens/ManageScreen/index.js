import React, { Component, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar, } from 'react-native';
import Styles from './styles';


const ManageScreen = ({ navigation }) => {
  useEffect(() => {

  });

  return (
    <View style={Styles.screen}>
      <View style={Styles.container}>
        <Text style={Styles.title}>QUẢN LÝ</Text>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#F67280" }]}
          onPress={() => navigation.navigate('ManageMember')}
        >
          <Text style={Styles.btnText}>Quản lý người mua</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#6C5B7B" }]}
          onPress={() => navigation.navigate('ManageSellingGood')}
        >
          <Text style={Styles.btnText}>Quản lý mặt hàng bán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#F8B195" }]}
          onPress={() => navigation.navigate('ManageImportGood')}
        >
          <Text style={Styles.btnText}>Quản lý mặt hàng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ManageScreen