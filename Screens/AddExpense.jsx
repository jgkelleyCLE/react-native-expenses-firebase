import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../constants/dummyData';
import Toast from 'react-native-root-toast';
import { COLORS } from '../constants/Colors';
import { addDoc } from 'firebase/firestore';
import { expensesRef } from '../firebase/firebase';
import Loading from '../Components/Loading'

const AddExpense = ({ route }) => {

    const navigation = useNavigation()

    console.log(route.params)

    const trip = route.params
    console.log("ROUTE PARAMS: ", trip)

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

  const handleAddExpense = async () => {
    if(title.trim() && amount.trim() && category){
        console.log(title, amount, category)

      setLoading(true)

      let doc = await addDoc(expensesRef, {
        title, 
        amount,
        category,
        tripId: trip.id
      })

      setLoading(false)

      if(doc && doc.id){
        navigation.goBack()
      }

        
    }else {
      Toast.show('Title and amount are required', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.red700,
        opacity: 0.95,
        shadow: false,
        animation: true,
        style: {borderRadius: 25}
      })
        console.log("ERROR")
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
          <Text className="text-2xl">{trip.place} Expenses</Text>
         
        </View>

    <View className="items-center mt-4">
      <Image className="w-72 h-72" source={require('../assets/expenseBanner.png')} />
    </View>

    <View>
      <Text className="text-xl font-bold mt-4 mb-1">What for?</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Text className="text-xl font-bold mt-4 mb-1">How much?</Text>
      <TextInput 
        className="bg-white w-full rounded-md p-2 text-xl"
        placeholder="Amount $"
        value={amount}
        onChangeText={setAmount}
      />
    </View>

    <View className="mt-4">
        <Text className="text-xl font-bold mb-2">Category</Text>
        <View className="flex-row flex-wrap">
        {categories.map(item => {
            // let bgColor = 'bg-white'
            // if(item.value==category) bgColor = 'bg-green-200'
            

            return (
                // <TouchableOpacity key="item.value" className={` rounded-xl ${bgColor} px-3 py-2 m-1`} onPress={()=> setCategory(item.value)}>
                <TouchableOpacity key={item.id} className={`${item.value==category ? 'bg-green-200' : 'bg-white'} rounded-xl  px-3 py-2 m-1`} onPress={()=> setCategory(item.value)}>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            )
            
        })}
        </View>
    </View>

    
        
        
      </View>

        {
          loading ? <Loading /> : (
            <TouchableOpacity className="bg-green-400 w-11/12 self-center rounded-md p-2 items-center absolute bottom-8" onPress={handleAddExpense}>
            <Text className="text-white text-2xl">Add Expense</Text>
          </TouchableOpacity>
          )
        }

      
    </View>
  )
}

export default AddExpense