import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import EmptyListExpenses from '../Components/EmptyListExpenses'
import { Feather } from '@expo/vector-icons';
import ExpenseCard from '../Components/ExpenseCard'
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { expensesRef, tripsRef } from '../firebase/firebase';
import Loading from '../Components/Loading'

const TripExpenses = ({ route }) => {

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(false)

    const trip = route.params
  

    const fetchExpenses = async() => {


      setLoading(true)
      const q = query(expensesRef, where("tripId", "==", trip.id))
      let data = []

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id })
      })

      setExpenses(data)
      setLoading(false)

    }

    useEffect(()=> {

      
      fetchExpenses()
      

    }, [isFocused])


  return (
    <View className="flex-1 bg-gray-200">
      <View className="mx-4">


         {/* HEADER */}
         <View className="items-center pt-14">
          {/* BACK BUTTON */}
        <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center absolute left-0 top-12" onPress={()=> navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

          <Text className="text-xl">{trip.place}</Text>
          <Text className="text-lg">{trip.country}</Text>
         
        </View>

      {/* BANNER */}
      <View className=" h-[250px] mt-4 rounded-lg items-center justify-center">
          <Image className="w-72 h-72  mt-4 rounded-lg" resizeMode='contain' source={require('../assets/7.png') } />
      </View>

    {/* MID HEADING */}
      <View className="my-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold">Expenses</Text>

        <TouchableOpacity className="bg-white p-2 rounded-2xl" onPress={()=> navigation.navigate("AddExpense", { ...trip })}>
            <Text className="font-semibold">Add Expense</Text>
          </TouchableOpacity>
      </View>

     

      <View>
            {/* BOTTOM CARDS */}
            {
              loading ? <Loading className="" /> : (
                <FlatList 
              style={{ height: 430 }}
              data={expenses}
              ListEmptyComponent={<EmptyListExpenses />}
              contentContainerStyle={{ paddingBottom: 60 }}
              renderItem={({ item }) => <ExpenseCard item={item} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item)=> item.id}
              />
              )
            }
            
      </View>

      

      </View>
      
    </View>
  )
}

export default TripExpenses