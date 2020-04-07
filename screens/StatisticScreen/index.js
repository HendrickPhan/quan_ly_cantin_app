import React, { Component, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import Styles from './styles';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

const StatisticScreen = () => {
  const [type, setType] = useState();

  return (
    <View style={Styles.screen}>
      <View style={Styles.container}>
        <Text style={Styles.title}>THỐNG KÊ</Text>

        <View style={Styles.fieldContainer}>
            <View
              style={Styles.selectField}
            >
              <Picker
                selectedValue={type}
                itemStyle={Styles.selectItem}
                onValueChange={(v, i) => setType(v)}
              >
                <Picker.Item label="Người mua" value="0" />
              </Picker>
            </View>
          </View>

      </View>
    </View>
  );
}

export default StatisticScreen