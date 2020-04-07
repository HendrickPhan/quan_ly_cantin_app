/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginScreen from './screens/LoginScreen';
import SellingScreen from './screens/SellingScreen';
import ImportScreen from './screens/ImportScreen';
import ManageScreen from './screens/ManageScreen';
import ManageMemberScreen from './screens/ManageMemberScreen';
import ManageImportGoodScreen from './screens/ManageImportGoodScreen';
import ManageSellingGoodScreen from './screens/ManageSellingGoodScreen';
import StatisticScreen from './screens/StatisticScreen';
import AccountScreen from './screens/AccountScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Selling"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Selling"
        component={SellingScreen}
        options={{
          tabBarLabel: 'Bán hàng',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Import"
        component={ImportScreen}
        options={{
          tabBarLabel: 'Nhập hàng',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arrow-down-bold-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={StatisticScreen}
        options={{
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Manage"
        component={ManageScreen}
        options={{
          tabBarLabel: 'Quản lý',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-register" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  
        initialRouteName="Login"
        headerMode='none'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        {/* <Stack.Screen name="Selling" component={SellingScreen} /> */}
        {/* <Stack.Screen name="Manage" component={ManageScreen} /> */}
        <Stack.Screen name="ManageMember" component={ManageMemberScreen} />
        <Stack.Screen name="ManageImportGood" component={ManageImportGoodScreen} />
        <Stack.Screen name="ManageSellingGood" component={ManageSellingGoodScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
