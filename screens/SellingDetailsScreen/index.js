import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Styles from './styles';
import Settings from '../../settings';
import { NumberWithCommas, DateStrFromDateTime } from '../../ulti'
import { useSelector } from "react-redux";
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const SellingDetailsScreen = ({navigation}) => {
const [message, setMessage] = useState();
const [refreshing, setRefreshing] = useState(false);
const [member, setMember] = useState([]);

const token = useSelector(state => {
    return state.user.user ? state.user.user.token : null
});

const fetchMembers = () => {
    fetch(Settings.API_DOMAIN + "member", {
    method: 'get',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    })
    .then((response) => {
        if (response.status === 200) {
        return response.json()
        } else {
        //failed
        }
    })
    .then((data) => {
        setMember(data)
    })
}

useEffect(() => {
    fetchMembers()
}, []);

const refresh = () => {
    setRefreshing(true)
    fetchMembers()
    setRefreshing(false)
}

return (
    <ScrollView style={Styles.screen}
    refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={() => refresh()}
        />
    }
    >
    <View style={Styles.screen}>
        <View style={Styles.container}>
            <Text style={Styles.title}>CHI TIẾT</Text>
            {message && <Text style={Styles.message}>{message}</Text>}
            {(member.length > 0) ? member.map((v) => {
            return (
                <>
                <View style={Styles.colField}>
                    <Text style={Styles.rowField}>ID: {v.id}</Text>
                    <Text style={Styles.rowField}>NAME: {v.name}</Text>
                    <Text style={Styles.rowField}>
                        THANH TOÁN: {true ? <MaterialCommunityIcons name="check" size={30} color={"#2F4F4F"}/>
                        : <MaterialCommunityIcons name="close" size={40} color={"#2F4F4F"}/>}
                    </Text>
                    <Text style={Styles.rowField}>CÒN NỢ: </Text>
                    <Text style={Styles.rowField}>NGÀY: </Text>
                </View>
                <View>
                    <Text>THANH TOÁN</Text>
                    <TextInput placeholder="Số tiền" keyboardType="numeric"></TextInput>
                    <TouchableOpacity><Text>XÁC NHẬN</Text></TouchableOpacity>
                </View>
                </>
            )
            }) : (<Text style={{marginTop: 15, marginBottom: 15, textAlign: "center"}}>Unavaiable!</Text>)}
        </View>
    </View>
    </ScrollView>
);
}

export default SellingDetailsScreen