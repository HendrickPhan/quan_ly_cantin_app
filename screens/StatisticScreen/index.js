import React, { Component, useState } from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import Styles from './styles';

const StatisticScreen = ({navigation}) => {
  const [type, setType] = useState();

  return (
    <View style={Styles.screen}>
      <View style={Styles.container}>
        <Text style={Styles.title}>THỐNG KÊ</Text>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#F67280" }]}
          onPress={() => navigation.navigate('StatisticMember')}
        >
          <Text style={Styles.btnText}>Thống kê người mua</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#6C5B7B" }]}
          onPress={() => navigation.navigate('StatisticSelling')}
        >
          <Text style={Styles.btnText}>Thống kê bán hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnContainer, { backgroundColor: "#F8B195" }]}
          onPress={() => navigation.navigate('StatisticSelling')}
        >
          <Text style={Styles.btnText}>Thống kê nhập hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StatisticScreen