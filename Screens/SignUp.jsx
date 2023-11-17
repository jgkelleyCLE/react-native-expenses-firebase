import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors'
// import { Toast } from "expo-react-native-toastify";
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../redux/userSlice';
import Loading from '../Components/Loading';


const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLoading = useSelector(state => state.user.userLoading)
    

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    if(email && password){
        
        try {
            dispatch(setUserLoading(true))
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setUserLoading(false))
        } catch (err) {
            dispatch(setUserLoading(true))
            if(err.message === "Firebase: Error (auth/invalid-email)."){
                Toast.show("Invalid E-mail address", {
                  position: Toast.positions.TOP,
                   backgroundColor: COLORS.red700,
                   duration: Toast.durations.LONG
              })
              dispatch(setUserLoading(false))
              }
        }
        
    }else {
        Toast.show('Email and password are required', {
           position: Toast.positions.TOP,
           backgroundColor: COLORS.red700,
           durations: Toast.durations.LONG,
           opacity: 0.90
          });
          
    }
  }

  return (
    <RootSiblingParent>
    <View className=" bg-gray-200 flex-1">
      <View className="mx-4">

        {/* HEADER */}
        <View className="items-center pt-14">
          {/* BACK BUTTON */}
        <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center absolute left-0 top-12" onPress={()=> navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
          <Text className="text-2xl">Sign Up</Text>
         
        </View>

    <View className="items-center mt-4">
      <Image className="w-80 h-80" source={require('../assets/login.png')} />
    </View>

    <View>
      <Text className="text-xl font-bold mt-4 mb-1">Email</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text className="text-xl font-bold mt-4 mb-1">Password</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </View>

    
        
        
      </View>

      {
        userLoading ? (
            <Loading /> 
        ) : (
            <TouchableOpacity className="bg-green-400 w-11/12 self-center rounded-md p-2 items-center absolute bottom-8" onPress={handleSignUp}>
                <Text className="text-white text-2xl">Sign Up</Text>
            </TouchableOpacity>
        )
      }
      
    </View>
    </RootSiblingParent>
  )
}

export default SignUp