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

const SellingListScreen = ({navigation}) => {
const [message, setMessage] = useState();
const [sortPress, setSortPress] = useState(false)
const [refreshing, setRefreshing] = useState(false);
const [memberList, setMemberList] = useState([]);
const [memberTotal, setMemberTotal] = useState([]);
const [date, setDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [checkPress, setCheckPress] = useState(false)
const [member, setMember] = useState("0");

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
        setMemberList(data)
        setMemberTotal(data)
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

const fetchMembersDate = (date) => {   
    fetch(Settings.API_DOMAIN + `selling-bill?date=${DateStrFromDateTime(date)}`, {
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
        setMemberList(data)
    })
}

const fetchMembersSort = (sta, val) => {    
    setSortPress(sta);
    fetch(Settings.API_DOMAIN + `selling-bill`, {
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
        setMemberList(data)
    })
}

const fetchMembersName = (name) => {    
    fetch(Settings.API_DOMAIN + `selling-bill/name`, {
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
        setMemberList(data)
    })
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
        
        <Text style={Styles.title}>DANH SÁCH</Text>
        
        {/* Message */}
        {message && 
            <Text style={Styles.message}>{message}</Text>
        }
        {/* Buying member */}
        <View style={Styles.fieldContainer}>
            <View style={Styles.selectField}>
                <Picker
                    selectedValue={member}
                    itemStyle={Styles.selectItem}
                    onValueChange={(v, i) => setMember(v)}>
                    <Picker.Item label="Người mua" value="0" />
                    {(memberTotal.length > 0) ? memberTotal.map((v) => {
                    return (
                        <Picker.Item key={v.id} label={v.name} value={v.id} onPress={() => fetchMembersName(v.name)}/>
                    )
                    }) : (<Text>Unavaiable!</Text>)}
                </Picker>
            </View>

            {/* Buying date */}
            <View style={Styles.sortDate}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                {checkPress ? <Text style={Styles.date}>Date: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}</Text>
                 : <Text style={Styles.date}>Date = ../../../</Text>}
            
                {showDatePicker &&
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShowDatePicker(Platform.OS === 'ios');
                        setDate(currentDate)
                        setCheckPress(true)
                        fetchMembersDate(currentDate);
                    }}
                    />
                }
                </TouchableOpacity>
            </View>
        </View>
        
        {/* Total */}
        <View style={Styles.fieldContainer}>
            <View style={Styles.selectField}>
                <Picker
                    selectedValue={member}
                    itemStyle={Styles.selectItem}
                    onValueChange={(v, i) => setMember(v)}>
                    <Picker.Item label="Ngày" value="asc"/>
                    <Picker.Item label="Thanh Toán" value="desc"/>
                </Picker>
            </View>
            {sortPress ? 
                <TouchableOpacity onPress={() => fetchMembersSort(false, member)} style={{marginLeft: 30, marginRight: 40, alignSelf: 'center', transform:[{rotate: "180deg"}]}}>
                        <MaterialCommunityIcons name="filter-variant" size={45}/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => fetchMembersSort(true, member)} style={{marginLeft: 30, marginRight: 40, alignSelf: 'center'}}>
                    <MaterialCommunityIcons name="filter-variant" size={45}/>
                </TouchableOpacity>
            }
        </View>

        </View>

        <View style={Styles.container}>
            <View style={Styles.rowField}>
                <Text style={Styles.colField}>TÊN</Text>
                <Text style={Styles.colField}>TỔNG</Text>
                <Text style={Styles.colField}>THANH TOÁN</Text>
                <Text style={Styles.colField}>CHI TIẾT</Text>
            </View>
            {(memberList.length > 0) ? memberList.map((v) => {
            return (
                <View style={Styles.rowField}>
                    <Text style={Styles.colField}>{v.name}</Text>
                    <Text style={Styles.colField}>{v.id}</Text>
                    <Text style={Styles.colField}>
                        {false ? <MaterialCommunityIcons name="check" size={40} color={"#2F4F4F"}/>
                        : <MaterialCommunityIcons name="close" size={40} color={"red"}/>}
                    </Text>
        
                    <View style={Styles.colField}>
                        <TouchableOpacity style={Styles.colField} onPress={() => navigation.navigate('SellingDetailsScreen', {id: v.id})}>
                            <MaterialCommunityIcons name="dots-horizontal" size={45} color={"#2F4F4F"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }) : (<Text style={{marginTop: 15, marginBottom: 15, textAlign: "center"}}>Unavaiable!</Text>)}
            
        </View>
    </View>
    </ScrollView>
);
}

export default SellingListScreen