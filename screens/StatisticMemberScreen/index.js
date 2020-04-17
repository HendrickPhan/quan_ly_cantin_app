import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { NumberWithCommas, DateStrFromDateTime } from '../../ulti'
import Styles from './styles';
import Settings from '../../settings';
import { useSelector } from "react-redux";

const StatisticMemberScreen = ({navigation}) => {
  const today = new Date();
  const [fromDate, setFromDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [toDate, setToDate] = useState(today);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const [statisticList, setStatisticList] = useState([]);

  const token = useSelector(state => {
    return state.user.user ? state.user.user.token : null
  });

  const fetchStatistic = () => {
    fetch(Settings.API_DOMAIN + `selling-bill/member-statistic?from_date=${DateStrFromDateTime(fromDate)}&to_date=${DateStrFromDateTime(toDate)}`, {
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
          <Text style={Styles.date}>Từ ngày: {`${fromDate.getDate()}/${fromDate.getMonth() + 1}/${fromDate.getFullYear()} `}</Text>
          <View style={Styles.btnContainer}>
            <Button
              color="#F8B195"
              title="Đổi"
              onPress={() => setShowFromDatePicker(true)}
            />
          </View>
        </View>
        <View style={Styles.fieldContainer}>
          <Text style={Styles.date}>Đến ngày: {`${toDate.getDate()}/${toDate.getMonth() + 1}/${toDate.getFullYear()} `}</Text>
          <View style={Styles.btnContainer}>
            <Button
              color="#C06C84"
              title="Đổi"
              onPress={() => setShowToDatePicker(true)}
            />
          </View>
        </View>

        <View style={Styles.listTitleContainer}>
          <Text style={Styles.listTitle}>Người mua</Text>
          <Text style={Styles.listTitle}>Đã trả</Text>
          <Text style={Styles.listTitle}>Nợ</Text>
          <Text style={Styles.listTitle}>Tổng</Text>
        </View>

        {statisticList.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={Styles.listItemContainer}
              onPress={() => {
                  navigation.navigate('DailyStatisticSelling', {
                    date: DateStrFromDateTime(new Date()),
                  });
                }
              }
            >
              <Text style={Styles.listItem}>{v.member ? v.member.name : 'Không lưu'}</Text>
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
            const currentDate = selectedDate || fromDate;
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
            const currentDate = selectedDate || toDate;
            setShowToDatePicker(Platform.OS === 'ios');
            setToDate(currentDate);
          }}
        />
      }

    </ScrollView>
  );
}

export default StatisticMemberScreen