import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import randomImage from '../assets/randomImage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import EmptyList from '../Components/EmptyListTrips'
import { useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../firebase/firebase'
import { getDocs, query, where } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {

  const user = useSelector(state => state.user.user)

  console.log("USER: ", user)

  const [trips, setTrips] = useState([])

  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const fetchTrips = async() => {
    const q = query(tripsRef, where("userId", "==", user.uid))
    let data = []
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => {
      console.log("document: ", doc.data())
      data.push({ ...doc.data(), id: doc.id })
    })

    setTrips(data)

  }


  useEffect(()=> {

    if(isFocused){
      fetchTrips()

    }

  }, [isFocused])


  const logOutHandler = async() => {
    // navigation.navigate("Welcome")
    await signOut(auth)

    await AsyncStorage.removeItem("userToken")
  }

  if(!user){
    navigation.navigate("Welcome")
  }

  return (
    <View className="flex-1 bg-gray-200 pt-14">
      <View className="mx-4">

        {/* HOME HEADER */}
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl text-neutral-700 font-bold">Expensify</Text>
          <TouchableOpacity className="bg-white p-2 rounded-2xl" onPress={()=> logOutHandler()}>
            <Text className="font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>

      {/* BANNER */}
      <View className="bg-blue-200 w-[100%] h-[250px] mt-4 rounded-lg items-center justify-center">
          <Image className="w-[100%] h-[100%]  mt-4 rounded-lg" resizeMode='contain' source={require('../assets/banner.png') } />
      </View>

    {/* MID HEADING */}
      <View className="my-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold">Recent Trips</Text>

        <TouchableOpacity className="bg-white p-2 rounded-2xl" onPress={()=> navigation.navigate("AddTrip")}>
            <Text className="font-semibold">Add Trip</Text>
          </TouchableOpacity>
      </View>


      {/* BOTTOM CARDS */}
      <FlatList 
        style={{ height: 430 }}
        data={trips}
        // numColumns={2}
        // columnWrapperStyle={{
        //   justifyContent: 'space-between'
        // }}
        ListEmptyComponent={<EmptyList />}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity className="bg-white p-3 rounded-md mb-2 " onPress={()=> navigation.navigate("TripExpenses", { ...item })}>
            <View>
              {/* <Image className="w-36 h-36" source={randomImage()} /> */}
              <Text className="text-lg font-bold">{item.place}</Text>
              <Text>{item.country}</Text>
            </View>
            </TouchableOpacity>
          )
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=> item.id}
      />


      </View>
      
    </View>
  )
}

export default Home