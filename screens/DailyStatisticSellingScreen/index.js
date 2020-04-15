import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { NumberWithCommas, DateStrFromDateTime } from '../../ulti'
import Styles from './styles';
import Settings from '../../settings';
import { useSelector } from "react-redux";

const DailyStatisticSellingScreen = ({ route, navigation }) => {
  const { date } = route.params || DateStrFromDateTime(new date());
  const [statisticList, setStatisticList] = useState([]);

  const token = useSelector(state => {
    return state.user.user ? state.user.user.token : null
  });
  const fetchStatistic = () => {
    console.log(Settings.API_DOMAIN + `selling-bill/daily-statistic?date=${date}`)
    fetch(Settings.API_DOMAIN + `selling-bill/daily-statistic?date=${date}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          return response.json()
        } else {
          //failed
        }
      })
      .then((data) => {
        console.log('xxxx')
        console.log(data)
        setStatisticList(data)
      })
  }

  useEffect(() => {
    fetchStatistic()
  }, [date]);
  console.log(statisticList)
  return (
    <ScrollView style={Styles.screen}

    >
      <View style={Styles.container}>
      <Text style={Styles.title}>THỐNG KÊ BÁN HÀNG NGÀY {date}</Text>

        <View style={Styles.listTitleContainer}>
          <Text style={Styles.listTitle}>Người mua</Text>
          <Text style={Styles.listTitle}>Đã trả</Text>
          <Text style={Styles.listTitle}>Nợ</Text>
          <Text style={Styles.listTitle}>Tổng</Text>
        </View>

        {statisticList.map((v, i) => {
          return (
            <View 
              key={i} 
              style={Styles.listItemContainer}
            >
              <Text style={Styles.listItem}>{v.member ? v.member.name : 'Không lưu'}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_paid)}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_total - v.total_paid)}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_total)}</Text>
            </View>
          )
        })}

      </View>
    </ScrollView>
  );
}

export default DailyStatisticSellingScreen