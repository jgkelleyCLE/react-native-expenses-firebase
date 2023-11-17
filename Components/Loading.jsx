import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/Colors'

const Loading = () => {
  return (
    <View className="flex-row items-center justify-center py-6">
      <ActivityIndicator size="large" color={COLORS.green400} />
    </View>
  )
}

export default Loading