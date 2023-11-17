import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AddExpense, AddTrip, Home, Login, SignUp, TripExpenses, Welcome } from '../Screens/index'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { setToken, setUser } from '../redux/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createNativeStackNavigator()

const AppNavigation = () => {

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  console.log("USER: ", user)


  onAuthStateChanged(auth, u => {

    // console.log("Got user: ", u)
    dispatch(setUser(u))
  })

  if(user){
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddTrip" component={AddTrip} />
              <Stack.Screen name="TripExpenses" component={TripExpenses} />
              <Stack.Screen name="AddExpense" component={AddExpense} />
          </Stack.Navigator>
      </NavigationContainer> 
      )
  }else {

    // NO USER 
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} options={{ presentation: 'modal' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ presentation: 'modal' }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="TripExpenses" component={TripExpenses} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
      </Stack.Navigator>
    </NavigationContainer>
    )
    
  }
  
}

export default AppNavigation