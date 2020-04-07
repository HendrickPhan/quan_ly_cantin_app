import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, Text, Modal, Button, TouchableOpacity, ScrollView } from 'react-native';
import Styles from './styles';
import Settings from '../../settings'
import { useSelector } from "react-redux";

const ManageImportGood = ({ navigation }) => {
  const [goodList, setGoodList] = useState([]);
  //create modal
  const defautCreateGoodData = {
    name: '',
    price: 0
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [createGoodData, setCreateGoodData] = useState(defautCreateGoodData);
  //update modal
  const defautUpdateGoodData = {
    id: 0,
    name: '',
    price: 0
  }
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [updateGoodData, setUpdateGoodData] = useState(defautUpdateGoodData);

  const token = useSelector(state => state.user.user.token);

  const closeCreateModal = () => {
    setModalVisible(false)
    setCreateGoodData(defautCreateGoodData)
  }

  const closeUpdateModal = () => {
    setModalUpdateVisible(false)
    setUpdateGoodData(defautUpdateGoodData)
  }

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
        console.log(data)
        setGoodList(data)
      })
  }

  const addGood = () => {
    fetch(Settings.API_DOMAIN + "import-good", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: modalMemberName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          //success
          fetchMembers()
          closeCreateModal()
        } else {
          //failed
        }
      })
  }

  const updateGood = () => {
    fetch(Settings.API_DOMAIN + "import-good/" + modalUpdateMemberId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: modalUpdateMemberName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          //success
          fetchMembers()
          closeUpdateModal()
        } else {
          //failed
        }
      })
  }

  const deleteGood = (id) => {
    fetch(Settings.API_DOMAIN + "import-good/" + id, {
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
          fetchMembers()
        } else {
          //failed
        }
      })
  }

  const openUpdateModal = (id, name) => {
    setUpdateModalMemberName(name) 
    setUpdateModalMemberId(id)
    setModalUpdateVisible(true)
  }


  useEffect(() => {
    fetchMembers()
  }, []);


  const GoodItem = (props) => {
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
            <Text style={Styles.title}>Cập nhật người mua</Text>
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {return setUpdateModalMemberName(text)}}
              value={modalUpdateMemberName}
              placeholder="Lớp - tên"
            />
            <Button
              title="Cập nhật"
              color="#C06C84"
              onPress={() => updateMember()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* Create modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
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
            <Text style={Styles.title}>Thêm người mua</Text>
            <TextInput
              style={Styles.textInput}
              onChangeText={(text) => {return setModalMemberName(text)}}
              value={modalMemberName}
              placeholder="Lớp - tên"
            />
            <Button
              title="Thêm"
              color="#C06C84"
              onPress={() => addMember()}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={Styles.container}>
        <Text style={Styles.title}>Quản lý người mua</Text>
        <View style={Styles.buttonContainer}>
          <Button
            title="Thêm"
            color="#6C5B7B"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <ScrollView style={Styles.scrollView}>
          {memberList.map((v, i) => {
            return (
              <MemberItem
                name={v.name}
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

export default ManageImportGood