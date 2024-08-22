import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ( { title, containerStyles, textStyles, subtitle}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-semibold ${textStyles}`}>{title}</Text>
      <Text className={`text-sm text-gray-100 text-center font-pregular`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox