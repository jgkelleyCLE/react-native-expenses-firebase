import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyListExpenses = () => {
  return (
    <View className="items-center mt-4">
        <Image className="h-48 w-48" source={require('../assets/empty.png')} />
      <Text className="text-gray-500 font-bold">You have not recorded any expenses yet</Text>
    </View>
  )
}

export default EmptyListExpenses