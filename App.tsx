/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/modules/home/HomeScreen';
import {COLOR} from './src/misc/Theme';
import PaymentDetailsScreen from './src/modules/payment.details/PaymentDetailsScreen';
import {Provider} from 'react-redux';
import store from './src/app/reducer/store';
import ChangeGuestScreen from "./src/modules/guest/ChangeGuestScreen";

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLOR.primary,
            },
            headerTitleStyle: {
              color: COLOR.white,
            },
            headerTintColor: COLOR.white,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />

          <Stack.Screen
            name="PaymentDetail"
            component={PaymentDetailsScreen}
            options={{title: 'Payment Details'}}
          />

          <Stack.Screen
            name="ChangeGuest"
            component={ChangeGuestScreen}
            options={{title: 'Tambah Data Tamu'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
