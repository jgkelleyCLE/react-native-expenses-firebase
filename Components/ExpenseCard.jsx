import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG } from '../constants/Colors'

const ExpenseCard = ({ item }) => {
  return (
    <View style={{ backgroundColor: categoryBG[item.category] }} className="flex-row items-center justify-between bg-white rounded-md my-1 p-2">
        <View className=" ">
            <Text className="text-xl">{item.title}</Text>
            <Text className="text-gray-600 italic">{item.category}</Text>
        </View>
        <Text>${item.amount}</Text>
    </View>
  )
}

export default ExpenseCard