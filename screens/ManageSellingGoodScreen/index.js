import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Text, Modal, Button, TouchableOpacity, ScrollView } from 'react-native';
import Styles from './styles';
import Settings from '../../settings'
import { useSelector } from "react-redux";

const ManageSellingGoodScreen = ({ navigation }) => {
  const [goodList, setGoodList] = useState([]);
  //create modal
  const defautCreateGoodData = {
    name: null,
    unit: null,
    price: null
  }
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [createGoodData, setCreateGoodData] = useState(defautCreateGoodData);
  //update modal
  const defautUpdateGoodData = {
    id: 0,
    name: null,
    unit: null,
    price: null
  }
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [updateGoodData, setUpdateGoodData] = useState(defautUpdateGoodData);

  const token = useSelector(state => state.user.user.token);

  const closeCreateModal = () => {
    setModalCreateVisible(false)
    setCreateGoodData(defautCreateGoodData)
  }

  const closeUpdateModal = () => {
    setModalUpdateVisible(false)
    setUpdateGoodData(defautUpdateGoodData)
  }

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
        console.log(data)
        setGoodList(data)
      })
  }

  const addGood = () => {
    
    fetch(Settings.API_DOMAIN + "selling-good", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({...createGoodData, price:createGoodData.price * 1 }),
    })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          //success
          fetchGoods()
          closeCreateModal()
        } else {
          //failed
          console.log(JSON.stringify({...createGoodData, price:createGoodData.price * 1 }))
        }
      })
  }

  const updateGood = () => {
    fetch(Settings.API_DOMAIN + "selling-good/" + updateGoodData.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        ...updateGoodData,
        price: updateGoodData.price * 1 
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          //success
          fetchGoods()
          closeUpdateModal()
        } else {
          //failed
        }
      })
  }

  const deleteGood = (id) => {
    fetch(Settings.API_DOMAIN + "selling-good/" + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        if (response.status === 200) {
          //success
          fetchGoods()
        } else {
          //failed
        }
      })
  }

  const openUpdateModal = (data) => {
    setUpdateGoodData(data) 
    setModalUpdateVisible(true)
  }


  useEffect(() => {
    fetchGoods()
  }, []);


  const GoodItem = (props) => {
    console.log(props)
    return (
      <View style={Styles.goodItemContainer}>
        <Text style={Styles.goodItemName}>{props.name}</Text>
        <Text style={Styles.goodItemUnit}>{props.unit}</Text>
        <Text style={Styles.goodItemPrice}>{props.price}</Text>
        <View style={Styles.goodItemBtn}>
          <Button
            title="Sửa"
            onPress={()=>{openUpdateModal(props)}}
            color="#355C7D"
          />
        </View>
        <View style={Styles.goodItemBtn}>
          <Button
            title="Xóa"
            color="#F67280"
            onPress={()=>deleteGood(props.id)}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={Styles.screen}>
      {/* Create modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateVisible}
        onRequestClose={() => {
          closeCreateModal()
        }}
      >
        <TouchableOpacity
          style={Styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => { closeCreateModal() }}
        >
          <View style={Styles.modalView}>
            <Text style={Styles.title}>Thêm hàng nhập</Text>
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {
                return setCreateGoodData({...createGoodData, name: text})
              }}
              value={createGoodData.name}
              placeholder="Tên mặt hàng"
            />
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {
                return setCreateGoodData({...createGoodData, unit: text})
              }}
              value={createGoodData.unit}
              placeholder="Đơn vị tính"
            />
            <TextInput
              keyboardType='numeric'
              style={Styles.textInput}
              onChangeText={(text) => {
                return setCreateGoodData({...createGoodData, price: text})
              }}
              value={createGoodData.price}
              placeholder="Giá"
            />
            <Button
              title="Thêm"
              color="#C06C84"
              onPress={() => addGood()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Update modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUpdateVisible}
      >
        <TouchableOpacity
          style={Styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => { closeUpdateModal() }}
        >
          <View style={Styles.modalView}>
            <Text style={Styles.title}>Cập nhật hàng nhập</Text>
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {
                return setUpdateGoodData({...updateGoodData, name: text})
              }}
              value={updateGoodData.name}
              placeholder="Tên mặt hàng"
            />
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {
                return setUpdateGoodData({...updateGoodData, unit: text})
              }}
              value={updateGoodData.unit}
              placeholder="Đơn vị tính"
            />
            <TextInput
              keyboardType='numeric'
              style={Styles.textInput}
              onChangeText={(text) => {
                return setUpdateGoodData({...updateGoodData, price: text})
              }}
              value={updateGoodData.price + ''}
              placeholder="Giá"
            />
            <Button
              title="Cập nhật"
              color="#C06C84"
              onPress={() => updateGood()}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={Styles.container}>
        <Text style={Styles.title}>Quản lý hàng bán</Text>
        <View style={Styles.buttonContainer}>
          <Button
            title="Thêm"
            color="#6C5B7B"
            onPress={() => setModalCreateVisible(true)}
          />
        </View>
        <View style={Styles.scrollTitle}>
          <Text style={Styles.scrollTitleItem}>
            Tên
          </Text>
          <Text style={Styles.scrollTitleItem}>
            Đơn vị
          </Text>
          <Text style={Styles.scrollTitleItem}>
            Giá
          </Text>
          <Text style={{flex: 2}}>
          </Text>
        </View>
        <ScrollView style={Styles.scrollView}>
          {goodList.map((v) => {
            return (
              <GoodItem
                name={v.name}
                price={v.price}
                unit={v.unit}
                id={v.id}
                key={v.id}
              />
            )
          })}
        </ScrollView>
      </View>

    </View>
  );
}

export default ManageSellingGoodScreen