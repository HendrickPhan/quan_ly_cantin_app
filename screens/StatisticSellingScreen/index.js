import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { NumberWithCommas, DateStrFromDateTime } from '../../ulti'
import Styles from './styles';
import Settings from '../../settings';
import { useSelector } from "react-redux";

const StatisticSellingScreen = () => {
  const [type, setType] = useState("0");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  
  const [statisticList, setStatisticList] = useState([]);

  const token = useSelector(state => {
    return state.user.user ? state.user.user.token : null
  });

  const fetchStatistic = () => {
    fetch(Settings.API_DOMAIN + `selling-bill/statistic?from_date=${DateStrFromDateTime(fromDate)}&to_date=${DateStrFromDateTime(toDate)}`, {
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
        setStatisticList(data)
      })
  }

  useEffect(() => {
    fetchStatistic()
  }, [fromDate, toDate]);

  return (
    <ScrollView style={Styles.screen}

    >
      <View style={Styles.container}>
        <Text style={Styles.title}>THỐNG KÊ BÁN HÀNG</Text>

        <View style={Styles.fieldContainer}>
          <Text style={Styles.date}>Từ ngày: {`${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()} `}</Text>
          <View style={Styles.btnContainer}>
            <Button
              color="#F8B195"
              title="Đổi"
              onPress={() => setShowFromDatePicker(true)}
            />
          </View>
        </View>
        <View style={Styles.fieldContainer}>
          <Text style={Styles.date}>Đến ngày: {`${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()} `}</Text>
          <View style={Styles.btnContainer}>
            <Button
              color="#C06C84"
              title="Đổi"
              onPress={() => setShowToDatePicker(true)}
            />
          </View>
        </View>

        <View style={Styles.listTitleContainer}>
          <Text style={Styles.listTitle}>Ngày</Text>
          <Text style={Styles.listTitle}>Đã trả</Text>
          <Text style={Styles.listTitle}>Nợ</Text>
          <Text style={Styles.listTitle}>Tổng</Text>
        </View>

        {statisticList.map((v, i) => {
          var date = v.gdate.split("-")
          date = date[2] + '/' + date[1] + '/' + date[0]
          return (
            <TouchableOpacity 
              key={i} 
              style={Styles.listItemContainer}
            >
              <Text style={Styles.listItem}>{date}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_paid)}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_total - v.total_paid)}</Text>
              <Text style={[Styles.listItem, { textAlign: "right" }]}>{NumberWithCommas(v.total_total)}</Text>
            </TouchableOpacity>
          )
        })}

      </View>

      {showFromDatePicker &&
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowFromDatePicker(Platform.OS === 'ios');
            setFromDate(currentDate);
          }}
        />
      }
      {showToDatePicker &&
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowToDatePicker(Platform.OS === 'ios');
            setToDate(currentDate);
          }}
        />
      }

    </ScrollView>
  );
}

export default StatisticSellingScreen