import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { Picker } from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Styles from './styles';
import Settings from '../../settings';
import { useSelector } from "react-redux";

const SellingScreen = () => {
  const [message, setMessage] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [goodList, setGoodList] = useState([]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [owe, setOwe] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [totalLeft, setTotalLeft] = useState();
  
  const [total, setTotal] = useState("0");

  const defaultBuyItem = {
    id: 0,
    quantity: null
  }
  const [buyList, setBuyList] = useState([
    defaultBuyItem
  ]);

  const token = useSelector(state => state.user.user.token);

  const fetchGoods = () => {
    fetch(Settings.API_DOMAIN + "import-good", {
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

  useEffect(() => {
    fetchGoods()
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
    } 

    fetch(Settings.API_DOMAIN + "import-bill", {
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
          <Text style={Styles.title}>NHẬP HÀNG</Text>
          {/* Message */}
          {message && 
            <Text style={Styles.message}>{message}</Text>
          }
          {/* Buying date */}
          <View style={Styles.fieldContainer}>
            <Text style={Styles.date}>Ngày nhập: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}</Text>
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