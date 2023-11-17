import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast'
import { COLORS } from '../constants/Colors';
import { tripsRef } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { addDoc } from 'firebase/firestore';

const AddTrip = () => {

  const [place, setPlace] = useState("")
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user.user)

  const navigation = useNavigation()

  const handleAddTrip = async () => {
    if(place && country){
      console.log(place, country)

      setLoading(true)
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid
      })

      setLoading(false)

      if(doc && doc.id){
        navigation.navigate("Home")

      }

    }else {
      Toast.show('Place and country are required', {
        position: Toast.positions.TOP,
             backgroundColor: COLORS.red700,
             duration: Toast.durations.LONG
      })
    }
  }

  return (
    <View className=" bg-gray-200 flex-1">
      <View className="mx-4">

        {/* HEADER */}
        <View className="items-center pt-14">
          {/* BACK BUTTON */}
        <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center absolute left-0 top-12" onPress={()=> navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
          <Text className="text-2xl">Add Trip</Text>
         
        </View>

    <View className="items-center mt-4">
      <Image className="w-72 h-72" source={require('../assets/4.png')} />
    </View>

    <View>
      <Text className="text-xl font-bold mt-4 mb-1">Where on Earth?</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="City"
        value={place}
        onChangeText={setPlace}
      />
      <Text className="text-xl font-bold mt-4 mb-1">Which country?</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
    </View>

    
        
        
      </View>

      {
        loading ? <ActivityIndicator size="large" color={COLORS.green400} className="absolute bottom-8 self-center" /> : (
          <TouchableOpacity className="bg-green-400 w-11/12 self-center rounded-md p-2 items-center absolute bottom-8" onPress={handleAddTrip}>
          <Text className="text-white text-2xl">Add Trip</Text>
        </TouchableOpacity>
        )
      }
      
    </View>
  )
}

export default AddTrip