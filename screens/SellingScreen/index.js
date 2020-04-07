import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import Styles from './styles';
import Settings from '../../settings';
import { useSelector } from "react-redux";

const SellingScreen = () => {
  const [message, setMessage] = useState();
  
  const [refreshing, setRefreshing] = useState(false);
  const [goodList, setGoodList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [owe, setOwe] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [totalLeft, setTotalLeft] = useState();
  
  const [member, setMember] = useState("0");

  const [total, setTotal] = useState("0");

  const defaultBuyItem = {
    id: 0,
    quantity: null
  }
  const [buyList, setBuyList] = useState([
    defaultBuyItem
  ]);

  const token = useSelector(state => {
    return state.user.user ? state.user.user.token : null
  });

  const fetchGoods = () => {
    fetch(Settings.API_DOMAIN + "selling-good", {
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
        setGoodList(data)
      })
  }

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
      })
  }

  useEffect(() => {
    fetchGoods()
    fetchMembers()
  }, []);

  const refresh = () => {
    setRefreshing(true)
    fetchGoods()
    fetchMembers()
    setRefreshing(false)
  }

  const addBuying = () => {
    setBuyList([...buyList, defaultBuyItem])
  }

  const calculateTotal = (bl=buyList) => {
    var total = 0
    bl.map((bv) => {
      var good = goodList.filter((v, i) => v.id == bv.id).shift()
      if(good) {
        total += good.price * bv.quantity 
      }
    })
    console.log("TOTAL")
    console.log(total)
    setTotal(total)
  }
  
  const changeBuyingItem = (bi, value) => { 
    setBuyList(buyList.map((v, i) => {
      if(i == bi ) {
        v.id = value
      }
      return v
    }))
    calculateTotal()
  }

  const setBuyingQuantity = (bi, value) => { 
    setBuyList(buyList.map((v, i) => {
      if(i == bi ) {
        v.quantity = value
      }
      return v
    }))
    calculateTotal()
  }

  const deleteBuying = (bi) => {
    var bl = buyList.filter((_, i) => i !== bi)
    calculateTotal(bl)
    setBuyList(bl)
  }

  const createBill = () => {
    var itemList = []
    buyList.map( v => {
      if(v.id > 0 && v.quantity > 0){
        itemList.push({
          "good_id": v.id * 1,
          "quantity": v.quantity * 1
        })
      }
    })

    var postData = {
      "date": date,
      "owe": owe,
      "total": total * 1,
      "paid": paidAmount * 1,
      "items": itemList,
      "member_id": member * 1
    } 

    console.log(postData)

    fetch(Settings.API_DOMAIN + "selling-bill", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(
        postData
      ),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          //failed
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          //failed
          throw new Error('Oh no!');
        }
      })
      .then((data) => {
       
        setMessage('Thêm thành công!')
        setTimeout(() => { setMessage(null) }, 3000);
      })
      .catch( (e) => {
        setMessage('THẤT BẠI!')
        setTimeout(() => { setMessage(null) }, 3000);
      })
      .finally( () => {
        setDate(new Date())
        setOwe(false)
        setPaidAmount(null)
        setTotalLeft(null)
        setMember("0")
        setTotal("0")
        setBuyList([defaultBuyItem])
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

          <Text style={Styles.title}>BÁN HÀNG</Text>
          {/* Message */}
          {message && 
            <Text style={Styles.message}>{message}</Text>
          }
          {/* Buying member */}
          <View style={Styles.fieldContainer}>
            <View
              style={Styles.selectField}
            >
              <Picker
                selectedValue={member}
                itemStyle={Styles.selectItem}
                onValueChange={(v, i) => setMember(v)}
              >
                <Picker.Item label="Người mua" value="0" />
                {memberList.map((v) => {
                  return (
                    <Picker.Item key={v.id} label={v.name} value={v.id} />
                  )
                })}
              </Picker>
            </View>
          </View>
          {/* Buying date */}
          <View style={Styles.fieldContainer}>
            <Text style={Styles.date}>Ngày mua: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `}</Text>
            <View style={Styles.btnContainer}>
              <Button
                color="#6C5B7B"
                title="Đổi"
                onPress={() => setShowDatePicker(true)}
              />
            </View>
          </View>

          {showDatePicker &&
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(Platform.OS === 'ios');
                setDate(currentDate);
              }}
            />
          }
          {/* Buying item list */}
          <Text style={Styles.buyingListTitle}>Danh sách mặt hàng</Text>
            {buyList.map((bv, bi) => {
              
              return bv && (
                <View style={Styles.fieldContainer} key={bi}>
                  <View style={Styles.selectByingField}>
                    <Picker
                      selectedValue={bv.id}
                      style={Styles.selectItem}
                      onValueChange={(v, i) => {
                        changeBuyingItem(bi, v)}
                      }
                    >
                      <Picker.Item label="Mặt hàng" value="0" />
                      {goodList.map((v) => {
                        return (
                          <Picker.Item key={v.id} label={v.name} value={v.id} />
                        )
                      })}
                    </Picker>
                  </View>
                  <TextInput
                    keyboardType='numeric'
                    style={Styles.buyingQuantityInput}
                    onChangeText={(text) => {
                      setBuyingQuantity(bi, text)
                    }}
                    value={bv.quantity}
                    placeholder="Số lượng"
                  />
                  <View style={Styles.btnContainer}>
                    <Button
                      title="X"
                      onPress={ () => { deleteBuying(bi) } }
                      color="#F67280"
                    />
                  </View>
                </View>
              )
            })}

            <View style={Styles.btnContainer}>
              <Button
                color="#F8B195"
                title="Thêm"
                onPress={() => addBuying() }
              />
            </View>


          
          {/* Total */}
          <View style={Styles.fieldContainer}>
            <Text style={{ alignSelf: "center" }}>Tổng cộng: </Text>
            <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20 }}>{total}</Text>
          </View>

          <View style={Styles.fieldContainer}>
            <Text style={{ alignSelf: "center" }}>Nợ ?</Text>
            <CheckBox
              title='Nợ'
              onValueChange={() => {
                setOwe(!owe)
                setTotalLeft(total - paidAmount)
              }}
              value={owe}
            />
          </View>

          {owe &&
            <React.Fragment>
              <TextInput
                keyboardType='numeric'
                style={Styles.textInput}
                onChangeText={(text) => {
                  setTotalLeft(total - text)
                  return setPaidAmount(text)
                }}
                value={paidAmount}
                placeholder="Số tiền đã thanh toán"
              />

              <View style={Styles.fieldContainer}>
                <Text style={{ alignSelf: "center" }}>Còn lại: </Text>
                <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20 }}>{totalLeft || 0}</Text>
              </View>
            </React.Fragment>
          }
            {/* create btn */}
            <View style={Styles.btnContainer}>
              <Button
                title="Tạo"
                onPress={() => createBill() }
              />
            </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SellingScreen