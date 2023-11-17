import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {

    const navigation = useNavigation()

  return (
    <View className="flex-1 bg-gray-200 pt-14">
      <View className="mx-4 items-center">
          <Image className="w-96 h-96 my-16 shadow-lg" source={require('../assets/welcome.gif')} />
          <Text className="text-4xl font-bold">Expensify</Text>

    
      <TouchableOpacity className="bg-green-400 items-center rounded-md p-2 w-11/12 mt-8" onPress={()=> navigation.navigate("Login")}>
        <Text className="text-white text-2xl">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white items-center rounded-md p-2 w-11/12 mt-4" onPress={()=> navigation.navigate("SignUp")}>
        <Text className="text-green-400 text-2xl">Sign Up</Text>
      </TouchableOpacity>
    

      </View>
      
    </View>
  )
}

export default Welcome